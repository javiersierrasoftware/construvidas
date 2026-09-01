import { Schema, model, models } from "mongoose";

const QuizAnswerSchema = new Schema({
  lessonId: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

const CourseEnrollmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedLessons: [
      {
        type: String, // lesson._id string
      },
    ],
    quizAnswers: [QuizAnswerSchema],
    progressPercent: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["EN_PROGRESO", "COMPLETADO"],
      default: "EN_PROGRESO",
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure 1 enrollment per user per course
CourseEnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const CourseEnrollment =
  models.CourseEnrollment || model("CourseEnrollment", CourseEnrollmentSchema);

export default CourseEnrollment;
