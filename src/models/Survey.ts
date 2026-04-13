import mongoose, { Schema, Document } from 'mongoose';

export interface ISurvey extends Document {
  title: string;
  description?: string;
  questions: {
    id: string;
    type: 'text' | 'multiple' | 'radio' | 'select';
    label: string;
    options?: string[]; // for radio and select
    required: boolean;
  }[];
  active: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SurveySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  slug: { type: String, unique: true, sparse: true },
  questions: [{
    id: { type: String, required: true },
    type: { type: String, enum: ['text', 'multiple', 'radio', 'select'], required: true },
    label: { type: String, required: true },
    options: [{ type: String }],
    required: { type: Boolean, default: false }
  }],
  active: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.Survey || mongoose.model<ISurvey>('Survey', SurveySchema);
