import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITrackingData extends Document {
  userId: string;
  eventType: string;
  eventData: any;
  timestamp: Date;
  sessionStart: Date;
  sessionEnd: Date;
}

const TrackingDataSchema = new Schema({
  userId: { type: String, required: true },
  eventType: { type: String, required: true },
  eventData: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
  sessionStart: { type: Date, required: true },
  sessionEnd: { type: Date, required: true },
  uniqueId: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substring(2, 7),
    unique: true,
  },
});

const TrackingDataModel: Model<ITrackingData> = mongoose.model<ITrackingData>(
  'TrackingData',
  TrackingDataSchema
);

export default TrackingDataModel;
