import { Schema, model, models } from "mongoose";

const QuizQuestionSchema = new Schema({
  type: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "OPEN"],
    default: "MULTIPLE_CHOICE",
  },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctOptionIndex: { type: Number, default: 0 },
  explanation: { type: String, default: "" },
});

const MaterialSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: "PDF" }, // PDF, ENLACE, LECTURA, DOCUMENTO
});

const BibleVerseSchema = new Schema({
  reference: { type: String, required: true }, // Ej: "Juan 3:16"
  text: { type: String, required: true }, // Texto completo del versículo
});

const LessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  bibleVerses: [BibleVerseSchema],
  materials: [MaterialSchema],
  quizzes: [QuizQuestionSchema],
  order: { type: Number, default: 0 },
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
  lessons: [LessonSchema],
});

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título del curso es obligatorio."],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria."],
    },
    goal: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?q=80&w=1200&auto=format&fit=crop",
    },
    category: {
      type: String,
      default: "Fundamentos", // Fundamentos, Discipulado, Liderazgo, Vida Cristiana
    },
    level: {
      type: String,
      default: "Principiante", // Principiante, Intermedio, Avanzado
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    durationHours: {
      type: String,
      default: "",
    },
    instructor: {
      type: String,
      default: "",
    },
    rewardFruits: {
      type: Number,
      default: 0,
    },
    enablesRoles: {
      type: [String],
      default: [],
    },
    enablesDescription: {
      type: String,
      default: "",
    },
    modules: [ModuleSchema],
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;
