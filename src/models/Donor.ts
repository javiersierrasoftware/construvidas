import mongoose, { Schema, Document } from 'mongoose';

export interface IDonor extends Document {
  name: string;
  phone: string;
  createdAt: Date;
}

const DonorSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donor || mongoose.model<IDonor>('Donor', DonorSchema);
