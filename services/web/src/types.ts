export type TaxDto = {
  amount: number;
  currency: 'PLN';
  type: 'INSURANCE' | 'INCOME';
  transferredAt: string;
};

export type Tax = {
  _id: string;
  amount: number;
  currency: string;
  type: 'INSURANCE' | 'INCOME';
  transferredAt: Date;
  createdAt: Date;
};
