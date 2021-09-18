import { Request, Response, NextFunction } from 'express';
import { BaseSchema, ValidationError } from 'yup';

import { RequestValidationError } from '../errors';

const validate = (schema: BaseSchema) => {
  return async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const { body } = req;

    try {
      await schema.validate(body, { abortEarly: false });
      next();
    } catch (error) {
      throw new RequestValidationError(error as ValidationError);
    }
  };
};

export { validate };
