import { Role as DBRole } from '@prisma/client';

class User {
  id: string;
  email: string;
  role: DBRole;
}

export { User, DBRole as UserRole };
