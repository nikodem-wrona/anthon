export class InternalError extends Error {
  constructor() {
    super('Internal error');
  }
}

export class UserUnauthorized extends Error {
  constructor() {
    super('User unauthorized');
  }
}
