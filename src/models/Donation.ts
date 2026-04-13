import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donorId: mongoose.Types.ObjectId;
  amount: number;
  month: number; // 1-12
  year: number;
  type: 'Efectivo' | 'Transferencia' | 'Otro';
  date: Date;
  createdAt: Date;
}

const DonationSchema: Schema = new Schema({
  donorId: { type: Schema.Types.ObjectId, ref: 'Donor', required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ['Efectivo', 'Transferencia', 'Otro'], default: 'Transferencia' },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
