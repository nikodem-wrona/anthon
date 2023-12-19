import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands';

@Injectable()
export class UsersService {
  constructor(private readonly commandBus: CommandBus) {}

  public async CreateUser(dto: CreateUserDto): Promise<void> {
    const { email } = dto;
    const command = new CreateUserCommand(email);
    await this.commandBus.execute(command);
  }
}
