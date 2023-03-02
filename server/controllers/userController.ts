/**
 * @module | userController.ts
 * @description | Contains middleware that creates new user in database, gets all users from database for system admin, and verifies user exists before sending back user data to login component
 **/

import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
import { UserController, ServerError } from '../../types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userController: UserController = {
  // create new user
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    console.log('beginning of createUser');
    if (res.locals.error) return next();
    const { username, email, phone, role_id } = req.body;
    const { hash } = res.locals;
    let role;

    switch (role_id) {
      case '1':
        role = 'system admin';
        break;
      case '2':
        role = 'admin';
        break;
      case '3':
        role = 'user';
        break;
    }
    console.log('the role ', role);

    try {
      console.log('in try block');
      const createUser =
        'INSERT INTO users (username, email, password, phone, role, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
      const userDetails = [username, email, hash, phone, role, role_id];
      console.log('USERDETAILS:', userDetails);

      if (username && hash) {
        console.log('in user and hash');
        const makeUser = await db.query(createUser, userDetails);
        console.log('after makeuser');
        const newUser = await makeUser[0];
        console.log(makeUser.rows[0], 'this is make0');
        res.locals.user = newUser;
        console.log('this is the role lol', role);
        console.log('this is the role_id', role_id);
        if (role === 'system admin' || role_id === '1') {
          console.log('beginning of role check');
          console.log(role, role_id, 'this is role and role id');
          await jwt.sign({ newUser }, process.env.JWT_KEY, (err, token) => {
            console.log(token);
            console.log(process.env.JWT_KEY);
            console.log('actually err', err);
            res.locals.token = token;
            //erase after testing
            console.log(res.locals.token);
            console.log('in jwt sign part');
            return next();
          });
          console.log('after role check ');
          return next();
        }
      }
    } catch (err: unknown) {
      return next({
        log: `Error in userController newUser: ${err}`,
        message: {
          err: 'An error occurred creating new user in database. See userController.newUser.',
        },
      });
    }
  },
  // get all users (system admin)
  getAllUsers: (req: Request, res: Response, next: NextFunction) => {
    if (Object.prototype.hasOwnProperty.call(res.locals, 'error')) {
      return next();
    } else {
      const allUsers = 'SELECT * FROM users ORDER BY _id ASC;';
      db.query(allUsers)
        .then((response: any) => {
          res.locals.users = response.rows;
          return next();
        })
        .catch((err: ServerError) => {
          return next({
            log: `Error in userController getAllUsers: ${err}`,
            message: {
              err: 'An error occurred retrieving all users from database. See userController.getAllUsers.',
            },
          });
        });
    }
  },

  // get information for one user
  getOneUser: (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;
    const oneUser = `SELECT * FROM users WHERE _id = $1;`;

    db.query(oneUser, [_id])
      .then((response: any) => {
        res.locals.users = response.rows;
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController getOneUser: ${err}`,
          message: {
            err: 'An error occurred retrieving user from database. See userController.getOneUser.',
          },
        });
      });
  },

  // verify user exists and send back user info
  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { username, password } = req.body;

    const getUser = `SELECT * FROM users WHERE username=$1;`;

    db.query(getUser, [username])
      .then(async (data: any) => {
        const match = await bcrypt.compare(password, data.rows[0].password);
        if (data.rows[0] && match) {
          res.locals.user = data.rows[0];
          return next();
        } else {
          res.locals.error = 'Incorrect username or password.';
          delete res.locals.user;
        }
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController checkUserExists: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.checkUserExists.',
          },
        });
      });
  },

  //not currently in use

  // checkSysAdmin: (req: Request, res: Response, next: NextFunction) => {
  //   const query = 'SELECT * FROM users WHERE role_id = 1';

  //   db.query(query)
  //     .then((data: any) => {
  //       res.locals.sysAdmins = data.rowCount;
  //       res.locals.id = data.rows[0]._id;
  //       return next();
  //     })
  //     .catch((err: ServerError) => {
  //       return next({
  //         log: `Error in userController switchUserRole: ${err}`,
  //         message: {
  //           err: 'An error occurred while checking number of SysAdmins. See userController.checkSysAdmins.',
  //         },
  //       });
  //     });
  // },

  //also not currently in use.

  // switches role of user upon designation by system admin
  // switchUserRole: (req: Request, res: Response, next: NextFunction) => {
  //   const roleMap: { [k: string]: number } = {
  //     'system admin': 1,
  //     admin: 2,
  //     user: 3,
  //   };

  //   const { _id, role } = req.body;

  //   if (res.locals.sysAdmins === 1 && _id == res.locals.id) {
  //     res.locals.hasError = true;
  //     next();
  //   } else {
  //     const query =
  //       'UPDATE users SET role = $1, role_id = $2 WHERE _id = $3 RETURNING *;';

  //     const parameters = [role, roleMap[role], _id];

  //     db.query(query, parameters)
  //       .then((data: any) => {
  //         res.locals.role = data.rows[0].role;
  //         res.locals.hasError = false;
  //         return next();
  //       })
  //       .catch((err: ServerError) => {
  //         return next({
  //           log: `Error in userController switchUserRole: ${err}`,
  //           message: {
  //             err: 'An error occurred while switching roles. See userController.switchUserRole.',
  //           },
  //         });
  //       });
  //   }
  // },

  updatePassword: (req: Request, res: Response, next: NextFunction) => {
    // if there is an error property on res.locals, return next(). i.e., incorrect password entered
    if (Object.prototype.hasOwnProperty.call(res.locals, 'error')) {
      res.locals.error =
        'Incorrect password. Please enter the correct password to update it.';
      return next();
    }
    const { hash } = res.locals;
    const { username } = req.body;

    // Note: for future, have the query return every column but the password column. Might be a security concern to be sending the user's hashed password to the client.

    const query =
      'UPDATE users SET password = $1 WHERE username = $2 RETURNING *;';
    const parameters = [hash, username];

    db.query(query, parameters)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController updatePassword: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.updatePassword.',
          },
        });
      });
  },

  updatePhone: (req: Request, res: Response, next: NextFunction) => {
    const { username, phone } = req.body;

    const query =
      'UPDATE users SET phone = $1 WHERE username = $2 RETURNING *;';
    const parameters = [phone, username];

    db.query(query, parameters)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController updatePhone: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.updatePhone.',
          },
        });
      });
  },

  updateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;

    const query =
      'UPDATE users SET email = $1 WHERE username = $2 RETURNING *;';
    const parameters = [email, username];

    db.query(query, parameters)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController updateEmail: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.updateEmail.',
          },
        });
      });
  },
};

export default userController;
