import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITrackingData extends Document {
  userId: string;
  eventType: string;
  eventData: any;
  timestamp: Date;
}

const TrackingDataSchema: Schema = new Schema({
  uniqueId: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substring(2, 7),
    index: { unique: true },
  },
  eventType: { type: String, required: true },
  eventData: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});

const TrackingDataModel: Model<ITrackingData> = mongoose.model<ITrackingData>(
  'TrackingData',
  TrackingDataSchema
);

export default TrackingDataModel;
