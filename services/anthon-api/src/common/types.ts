import { Role as DBRole } from '@prisma/client';

export type AppConfiguration = {
  PORT: number;
};

export { DBRole as UserRole };
