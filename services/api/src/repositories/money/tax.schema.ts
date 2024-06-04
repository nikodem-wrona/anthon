import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaxDocument = HydratedDocument<Tax>;

export enum TaxType {
  INSURANCE = 'INSURANCE',
  INCOME = 'INCOME',
}

@Schema({
  collection: 'taxes',
})
export class Tax {
  @Prop({
    required: true,
    type: Number,
  })
  amount: number;

  @Prop({
    required: true,
    type: String,
  })
  currency: string;

  @Prop({
    required: true,
    type: String,
  })
  type: TaxType;

  @Prop({
    required: true,
    type: Date,
  })
  transferredAt: number;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: number;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);
