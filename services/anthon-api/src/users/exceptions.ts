export class UserWithGivenEmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with given email: ${email} already exists`);
  }
}

export class UserWithGivenIdNotFound extends Error {
  constructor(id: string) {
    super(`User with given id: ${id} not found`);
  }
}

export class UserWithGivenApiKeyNotFound extends Error {
  constructor() {
    super(`User with given api key not found`);
  }
}

export class UserIsNotAuthorizedToCreateApiKey extends Error {
  constructor() {
    super(`User with following is not authorized to create api keys`);
  }
}
