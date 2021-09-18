import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};

export { errorHandler };
