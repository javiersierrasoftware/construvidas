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
    console.log("[!] DATOS RECIBIDOS DEL STORAGE:", JSON.stringify(data, null, 2));
    
    // Función auxiliar mejorada para buscar de forma profunda
    const findValue = (obj: any, keys: string[]): string | null => {
      if (!obj) return null;
      
      // Si es un string y termina en una extensión de imagen común (y lo buscamos como path)
      if (typeof obj === 'string' && keys.includes('path')) {
         const lower = obj.toLowerCase();
         if (lower.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return obj;
      }

      // 1. Buscar en las llaves del nivel actual
      for (const key of keys) {
        if (obj[key] && typeof obj[key] === 'string') return obj[key];
      }

      // 2. Si es un Array, buscar en cada elemento
      if (Array.isArray(obj)) {
        for (const item of obj) {
          const found = findValue(item, keys);
          if (found) return found;
        }
      } 
      // 3. Si es un Objeto, buscar recursivamente
      else if (typeof obj === 'object') {
        for (const key in obj) {
          const found = findValue(obj[key], keys);
          if (found) return found;
        }
      }
      return null;
    };

    let finalUrl = "";
    
    // Intentar encontrar URL, Path o Filename
    const extractedUrl = findValue(data, ['url', 'secure_url', 'publicUrl', 'link', 'href']);

    if (extractedUrl && extractedUrl.startsWith('http')) {
      finalUrl = extractedUrl;
    } 
    // 2. Intentar encontrar un path y combinarlo con S3
    else {
      const bucket = data.bucket || data.data?.bucket || 'media';
      const extractedPath = findValue(data, ['objectKey', 'path', 'key', 'filename', 'filePath', 'name']);
      
      if (extractedPath) {
        if (extractedPath.startsWith('http')) {
          finalUrl = extractedPath;
        } else {
          const cleanPath = extractedPath.startsWith('/') ? extractedPath.substring(1) : extractedPath;
          // Si el path ya es completo (bucket/public/...) o si hay que construirlo
          finalUrl = extractedPath.includes(bucket)
            ? `${s3Url}/${cleanPath}`
            : `${s3Url}/${bucket}/${cleanPath}`;
        }
      }
    }

    if (!finalUrl || finalUrl.includes('{')) {
      console.error("[!!!] FALLO DE EXTRACCIÓN. Cuerpo recibido:", JSON.stringify(data, null, 2));
      throw new Error("No se encontró una URL, path o filename válido en la respuesta del storage.");
    }

    console.log("[✔] URL GENERADA EXITOSAMENTE:", finalUrl);
    return finalUrl;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}
