/**
 * @module | signupRouter.ts
 * @description | Routes all requests to signup endpoint
 **/

import { Router, Request, Response } from 'express';
import signupController from '../controllers/signupController';
import bcryptController from '../controllers/bcryptController';
import userController from '../controllers/userController';
import apiController from '../controllers/apiController';

const router = Router();

// Only trigger this endpoint when sysAdmin logs in
router.get('/', userController.getAllUsers, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.users);
});

router.post(
  '/',
  signupController.usernameCheck,
  signupController.passwordCheck,
  bcryptController.hashPassword,
  userController.createUser,
  apiController.signupEmail,
  (req: Request, res: Response) => {
    console.log(res.locals.token, 'this is res locals token');
    if (res.locals.error) return res.status(201).json(res.locals.error);
    else if (res.locals.token) {
      res.cookie('admin', res.locals.token, { httpOnly: true });
      return res.status(201).json();
    } else {
      return res.status(200).json('Welcome new user!');
    }
  },
);

export default router;
