import { Schema, model, models } from "mongoose";

const BibleVerseSchema = new Schema({
  reference: { type: String, required: true }, // Ej: "Proverbios 3:5-6"
  text: { type: String, required: true }, // Texto bíblico completo
});

const DevotionalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título del devocional es obligatorio."],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    bibleVerse: {
      type: BibleVerseSchema,
      required: [true, "El versículo bíblico clave es obligatorio."],
    },
    reflection: {
      type: String,
      required: [true, "La reflexión o mensaje del día es obligatoria."],
    },
    prayer: {
      type: String,
      default: "", // Oración o aplicación práctica del día
    },
    author: {
      type: String,
      default: "Equipo Pastoral CONSTRUVIDAS",
    },
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Devotional = models.Devotional || model("Devotional", DevotionalSchema);

export default Devotional;
