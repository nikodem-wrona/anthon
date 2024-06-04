import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { MoneyRepository, Tax } from '../repositories';
import { CreateTaxDto, DeleteTaxDto } from '../dto';

@Controller()
export class MoneyController {
  constructor(private readonly moneyRepository: MoneyRepository) {}

  @Post('/tax')
  async createTax(@Body() dto: CreateTaxDto): Promise<void> {
    const { amount, currency, type, transferredAt } = dto;

    await this.moneyRepository.create({
      amount,
      currency,
      type,
      transferredAt,
    });
  }

  @Get('/taxes')
  async getTaxes(): Promise<Tax[]> {
    return this.moneyRepository.findAll();
  }

  @Delete('/tax')
  async deleteTax(@Body() dto: DeleteTaxDto): Promise<Tax> {
    return this.moneyRepository.deleteOne(dto.taxId);
  }
}
