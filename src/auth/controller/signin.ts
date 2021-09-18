import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { User } from '../models/user';
import { BadRequestError } from '../../errors';
import { ManagePassword } from '../services/';

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('Invalid username or Password');
  }

  const match = await ManagePassword.match(user.password, password);

  if (!match) {
    throw new BadRequestError('Invalid username or Password');
  }

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

  res.status(200).send(user);
};

const schema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().label('Password')
});

export { signin, schema as signinSchema };
