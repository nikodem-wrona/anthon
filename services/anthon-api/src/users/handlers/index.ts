import { CreateApiKeyCommandHandler } from './CreateApiKey.command-handler';
import { CreateUserCommandHandler } from './CreateUser.command-handler';
import { UpdateUserCommandHandler } from './UpdateUser.command-handler';

export const CommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  CreateApiKeyCommandHandler,
];
