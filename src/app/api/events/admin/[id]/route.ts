import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { uploadFile } from "@/lib/storage";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET: Obtener los datos de un evento para el formulario de edición

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ ok: false, message: "ID de evento no válido" }, { status: 400 });
    }

    await connectDB();
    const event = await Event.findById(id).lean();


    if (!event) {
      return NextResponse.json({ ok: false, message: "Evento no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: event });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ ok: false, message: "ID de evento no válido" }, { status: 400 });
    }

    const formData = await req.formData();

    // DEBUG LOG
    console.log("--- DEBUG PUT FORM DATA START ---");
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`Key: ${key}, Value: ${typeof value === 'object' ? '[File]' : value}`);
    }
    console.log("--- DEBUG PUT FORM DATA END ---");

    const file = formData.get("image") as File | null;

    let imageUrl = formData.get("currentImage") as string || "";

    if (file && typeof file !== 'string') {
      imageUrl = await uploadFile(file);
    }

    const updatedData: any = {};

    // Campos simples (Strings)
    const stringFields = ["name", "description", "time", "location", "ministry", "maxRegistrationTime"];
    stringFields.forEach(field => {
      const val = formData.get(field);
      if (val !== null) updatedData[field] = val as string;
    });

    // Precio
    const priceVal = formData.get("price");
    if (priceVal !== null) updatedData.price = Number(priceVal);

    // Fechas
    const dateRawVal = formData.get("date") as string;
    if (dateRawVal) updatedData.date = new Date(`${dateRawVal}T12:00:00`);

    const maxRegDateRawVal = formData.get("maxRegistrationDate") as string;
    if (maxRegDateRawVal !== null) {
      if (maxRegDateRawVal.trim() !== "") {
        updatedData.maxRegistrationDate = new Date(`${maxRegDateRawVal}T12:00:00`);
      } else {
        updatedData.maxRegistrationDate = null;
      }
    }

    if (imageUrl) updatedData.image = imageUrl;


    console.log("LOG API: Procediendo a actualizar evento con:", updatedData);

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });



    if (!updatedEvent) {
      return NextResponse.json({ ok: false, message: "No se pudo encontrar el evento para actualizar" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: updatedEvent }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 ERROR EN /events/admin/[id]:", error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}

// DELETE: Eliminar un evento
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ ok: false, message: "ID de evento no válido" }, { status: 400 });
    }

    await connectDB();
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ ok: false, message: "Evento no encontrado o ya eliminado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Evento eliminado correctamente" });
  } catch (error: any) {
    console.error("🔥 ERROR DELETE API:", error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}

