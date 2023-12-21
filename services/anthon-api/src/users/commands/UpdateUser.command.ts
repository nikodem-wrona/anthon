import { UserRole } from '../models';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly role?: UserRole,
  ) {}
}
