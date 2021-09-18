import { Request, Response, NextFunction } from 'express';

import { NotAuthorized } from '../errors';

const authorized = (req: Request, _: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorized('Not Authorized');
  }

  next();
};

export { authorized };
