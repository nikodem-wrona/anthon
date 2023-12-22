import { UserRole } from 'src/common/types';

export class CreateUserDto {
  email: string;
}

export class UpdateUserDto {
  id: string;
  email: string;
  role: UserRole;
}

export class CreateApiKeyDto {
  userId: string;
}
