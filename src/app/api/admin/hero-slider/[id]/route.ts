import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';
import { uploadFile } from '@/lib/storage';

// Helper function for authentication
async function authenticateAdmin() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "ADMIN") {
    return session.user;
  }
  return null;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await authenticateAdmin();
    if (!admin) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const formData = await request.formData();
    const title = formData.get('title') as string | null;
    const subtitle = formData.get('subtitle') as string | null;
    const buttonLink = formData.get('buttonLink') as string | null;
    const order = formData.get('order') as string | null;
    const imageFile = formData.get('image') as File | null;

    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile);

      if (!imageUrl) {
        return NextResponse.json({ message: "Fallo al subir la imagen" }, { status: 500 });
      }
    }

    const updateData: { [key: string]: any } = {};
    if (title) updateData.title = title;
    if (subtitle) updateData.subtitle = subtitle;
    if (buttonLink) updateData.buttonLink = buttonLink;
    if (order !== null) updateData.order = parseInt(order);
    if (imageUrl) updateData.image = imageUrl;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: "No se proporcionaron campos para actualizar" }, { status: 400 });
    }

    const updatedSlide = await HeroSlide.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSlide) {
      return NextResponse.json({ message: "Hero slide no encontrada" }, { status: 404 });
    }

    return NextResponse.json(updatedSlide);
  } catch (error) {
    console.error("Error actualizando hero slide:", error);
    return NextResponse.json({ message: "Fallo al actualizar hero slide", error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await authenticateAdmin();
    if (!admin) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const deletedSlide = await HeroSlide.findByIdAndDelete(id);

    if (!deletedSlide) {
      return NextResponse.json({ message: "Hero slide no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Hero slide eliminada exitosamente" });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json({ message: "Fallo al eliminar hero slide", error }, { status: 500 });
  }
}