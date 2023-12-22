import { UserRole } from 'src/common/types';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly role?: UserRole,
  ) {}
}
