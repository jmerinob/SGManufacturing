import { Schema } from 'mongoose';

export const MachineSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  productionLine: String,
  productionLocation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
