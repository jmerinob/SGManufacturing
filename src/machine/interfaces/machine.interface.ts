import { Document } from 'mongoose';

export interface Machine extends Document {
  readonly name: String;
  readonly description: String;
  readonly productionLine: string;
  readonly productionLocation: string;
  readonly createdAt: Date;
}
