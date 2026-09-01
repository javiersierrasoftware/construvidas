import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "El nombre del evento es obligatorio."],
      trim: true,
    },
    ministry: {
      type: String,
      required: [true, "El ministerio es obligatorio."],
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "La fecha es obligatoria."],
    },
    time: {
      type: String,
      required: [true, "La hora es obligatoria."],
    },
    location: {
      type: String,
      required: [true, "La ubicación es obligatoria."],
      trim: true,
    },
    maxRegistrationDate: {
      type: Date,
    },
    maxRegistrationTime: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// Evita sobreescribir el modelo si ya existe (importante en Next.js)
const Event = models.Event || model("Event", EventSchema);

export default Event;
