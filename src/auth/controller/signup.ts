import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';

import { BadRequestError } from '../../errors';
import { User, UserAttrs } from '../models/user';

const signup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body as UserAttrs;
  const isUser = await User.findOne({ email });

  if (isUser) {
    throw new BadRequestError('Email already taken');
  }

  const user = User.build({
    email,
    name,
    password
  });

  await user.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);
};

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(8).max(25).label('Password')
});

export { signup, schema as signupSchema };
