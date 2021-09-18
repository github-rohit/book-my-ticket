import { ValidationError } from 'yup';
import CustomError from './custom-error';

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const { inner } = this.errors;

    const error = inner.map((error) => {
      return {
        message: error.message,
        field: error.path
      };
    });

    return error;
  }
}

export { RequestValidationError };
