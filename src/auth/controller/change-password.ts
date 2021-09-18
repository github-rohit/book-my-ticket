import { Request, Response } from 'express';
import * as yup from 'yup';

import { BadRequestError } from '../../errors';
import { User } from '../models/user';

const changePassword = async (req: Request, res: Response) => {
  const { id } = req.currentUser!;

  const user = await User.findById({ _id: id });

  if (!user) {
    throw new BadRequestError('Bad Request');
  }

  user.password = req.body.password;

  await user.save();

  res.status(200).send({});
};

const schema = yup.object().shape({
  password: yup.string().required().min(8).max(25).label('Password')
});

export { changePassword, schema as changePasswordSchema };
