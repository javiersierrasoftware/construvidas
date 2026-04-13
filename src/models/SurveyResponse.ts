import mongoose, { Schema, Document } from 'mongoose';

export interface ISurveyResponse extends Document {
  surveyId: mongoose.Types.ObjectId;
  answers: {
    questionId: string;
    value: any;
  }[];
  createdAt: Date;
}

const SurveyResponseSchema: Schema = new Schema({
  surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: [{
    questionId: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }
  }]
}, { timestamps: true });

export default mongoose.models.SurveyResponse || mongoose.model<ISurveyResponse>('SurveyResponse', SurveyResponseSchema);
