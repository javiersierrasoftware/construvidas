import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { uploadFile } from "@/lib/storage";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 1. Proteger la ruta para que solo ADMINS puedan crear eventos
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }


    await connectDB();

    const formData = await req.formData();

    // DEBUG LOG
    console.log("--- DEBUG POST FORM DATA START ---");
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`Key: ${key}, Value: ${typeof value === 'object' ? '[File]' : value}`);
    }
    console.log("--- DEBUG POST FORM DATA END ---");

    const file = formData.get("image") as File | null;


    let imageUrl = "";
    if (file) {
      imageUrl = await uploadFile(file);
    }

    const name = formData.get("name") as string;

    if (!name) {
      return NextResponse.json({ ok: false, message: "El nombre es obligatorio." }, { status: 400 });
    }

    // Función para crear un slug amigable para la URL
    const slugify = (str: string) =>
      str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

    // Generar y asegurar que el slug sea único
    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (await Event.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    // 2. Construir objeto de datos del evento (limpio)
    const eventObj: any = {
      name,
      slug,
      createdBy: (session.user as any).id,
      image: imageUrl,
    };

    // Mapeo de campos simples
    const stringFields = ["description", "time", "location", "ministry", "maxRegistrationTime"];
    stringFields.forEach(field => {
      const val = formData.get(field);
      if (val !== null) eventObj[field] = val as string;
    });

    // Precio
    const priceVal = formData.get("price");
    if (priceVal !== null) eventObj.price = Number(priceVal);

    // Fechas
    const dateVal = formData.get("date") as string;
    if (dateVal) eventObj.date = new Date(`${dateVal}T12:00:00`);

    const maxRegDateVal = formData.get("maxRegistrationDate") as string;
    if (maxRegDateVal !== null && maxRegDateVal.trim() !== "") {
      eventObj.maxRegistrationDate = new Date(`${maxRegDateVal}T12:00:00`);
    }

    console.log("LOG API: Guardando nuevo evento con:", eventObj);

    const newEvent = new Event(eventObj);
    await newEvent.save();


    return NextResponse.json({ ok: true, data: newEvent }, { status: 201 });
  } catch (error: any) {
    console.error("🔥 ERROR EN /events/admin:", error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
