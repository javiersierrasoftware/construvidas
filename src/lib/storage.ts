export async function uploadFile(file: File, visibility: 'public' | 'private' = 'public') {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STORAGE_API_URL;
    const s3Url = process.env.NEXT_PUBLIC_STORAGE_S3_URL;

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_STORAGE_API_URL is not defined");
    }

    const formData = new FormData();
    formData.append("file", file);

    // Using app=ConstruVIDAS as requested by the user
    const url = `${apiUrl}/files/upload?app=ConstruVIDAS&visibility=${visibility}`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Storage API error response:", errorText);
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    const data = await response.json();
    
    // The response structure usually contains the path or filename.
    // Based on common patterns for this type of API:
    // If it returns a path, we might need to prepend the S3 URL.
    // However, if it returns a full URL, we use that.
    
    let finalUrl = "";
    
    if (data.url) {
      finalUrl = data.url;
    } else if (data.path) {
      // If data.path is like "/ConstruVIDAS/filename.jpg"
      // and s3Url is "https://s3.licitacionesefectivas.com"
      // we combine them.
      const path = data.path.startsWith('/') ? data.path : `/${data.path}`;
      finalUrl = `${s3Url}${path}`;
    } else if (data.filename) {
      // If it only returns filename, it might be in the app folder
      finalUrl = `${s3Url}/ConstruVIDAS/${data.filename}`;
    } else {
      // Fallback: return the whole data or try to find a string that looks like a path
      console.warn("Storage API returned unknown structure:", data);
      finalUrl = data.url || data.path || JSON.stringify(data);
    }

    return finalUrl;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}
