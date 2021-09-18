import express, { Router } from 'express';

import { validate, authorized } from '../../middleware';
import { SIGNUP, SIGNIN, SIGNOUT, CHANGE_PASSWORD } from './end-points';
import { signup, signupSchema } from '../controller/signup';
import { signin, signinSchema } from '../controller/signin';
import { signout } from '../controller/signout';
import {
  changePassword,
  changePasswordSchema
} from '../controller/change-password';

const router: Router = express.Router();

router.post(SIGNUP, validate(signupSchema), signup);

router.post(SIGNIN, validate(signinSchema), signin);

router.post(SIGNOUT, signout);

router.put(
  CHANGE_PASSWORD,
  authorized,
  validate(changePasswordSchema),
  changePassword
);

export default router;
