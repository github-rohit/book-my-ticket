import CustomError from './custom-error';

class NotFound extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not Found');

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}

export { NotFound };
