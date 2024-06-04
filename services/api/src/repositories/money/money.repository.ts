import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tax } from './tax.schema';

@Injectable()
export class MoneyRepository {
  constructor(@InjectModel(Tax.name) private taxModel: Model<Tax>) {}

  async create(data: Tax): Promise<Tax> {
    const tax = new this.taxModel(data);
    return tax.save();
  }

  async findAll(): Promise<Tax[]> {
    return this.taxModel.find().exec();
  }

  async deleteOne(id: string): Promise<Tax> {
    return this.taxModel.findByIdAndDelete(id).exec();
  }
}
