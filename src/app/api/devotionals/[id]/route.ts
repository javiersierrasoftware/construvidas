import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Devotional from "@/models/Devotional";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/devotionals/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    let devotional = await Devotional.findById(id).lean();
    if (!devotional) {
      devotional = await Devotional.findOne({ slug: id }).lean();
    }

    if (!devotional) {
      return NextResponse.json(
        { message: "Devocional no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(devotional);
  } catch (error: any) {
    console.error("🔴 Error GET /api/devotionals/[id]:", error);
    return NextResponse.json(
      { message: "Error al obtener devocional", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/devotionals/[id] (Admin only)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    await connectDB();
    const body = await req.json();

    const updated = await Devotional.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Devocional no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("🔴 Error PUT /api/devotionals/[id]:", error);
    return NextResponse.json(
      { message: "Error al actualizar devocional", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/devotionals/[id] (Admin only)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    await connectDB();
    await Devotional.findByIdAndDelete(id);

    return NextResponse.json({ message: "Devocional eliminado correctamente" });
  } catch (error: any) {
    console.error("🔴 Error DELETE /api/devotionals/[id]:", error);
    return NextResponse.json(
      { message: "Error al eliminar devocional", error: error.message },
      { status: 500 }
    );
  }
}
