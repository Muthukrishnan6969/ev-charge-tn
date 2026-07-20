import mongoose, { Document, Schema } from 'mongoose';

export interface IChargingStation extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  chargers: {
    type: string;
    powerKw: number;
    count: number;
    status: 'Available' | 'Occupied' | 'Offline';
    pricing: string;
  }[];
  amenities: string[];
  rating: number;
  reviewsCount: number;
  open24x7: boolean;
  network: string;
  contactNumber?: string;
  photos: string[];
}

const chargingStationSchema = new Schema<IChargingStation>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point', required: true },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    chargers: [
      {
        type: { type: String, required: true },
        powerKw: { type: Number, required: true },
        count: { type: Number, required: true },
        status: { type: String, enum: ['Available', 'Occupied', 'Offline'], default: 'Available' },
        pricing: { type: String },
      },
    ],
    amenities: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    open24x7: { type: Boolean, default: true },
    network: { type: String, required: true },
    contactNumber: { type: String },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

chargingStationSchema.index({ location: '2dsphere' });

const ChargingStation = mongoose.model<IChargingStation>('ChargingStation', chargingStationSchema);

export default ChargingStation;
