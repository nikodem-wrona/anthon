import { IsHexadecimal, IsNotEmpty } from 'class-validator';

export class DeleteTaxDto {
  @IsNotEmpty()
  @IsHexadecimal()
  taxId: string;
}
