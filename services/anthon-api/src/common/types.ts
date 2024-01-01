import { Role as DBRole } from '@prisma/client';

export type AppConfiguration = {
  PORT: number;
  WHISPER_API_URL: string;
};

export { DBRole as UserRole };
