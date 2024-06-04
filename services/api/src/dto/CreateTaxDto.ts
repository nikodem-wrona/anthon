import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

import { TaxType } from '../repositories';

export class CreateTaxDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @Length(3, 3)
  currency: string;

  @IsNotEmpty()
  @IsIn([TaxType.INCOME, TaxType.INSURANCE])
  type: TaxType;

  @IsNotEmpty()
  @IsDateString()
  transferredAt: number;
}
