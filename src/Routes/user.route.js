import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    deleteUser,
} from '../Controllers/user.controller.js';

const userRouter = Router();
// const urlBodyParser = bodyParser.urlencoded({extended:false});
// const jsonBodyParser = bodyParser.json()

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/password/forgot').post(forgotPassword);
userRouter.route('/password/reset').patch(resetPassword);

userRouter.route('/logout').get(logOut);
userRouter.route('/password/update').patch(updatePassword);
userRouter.route('/me').get(getUserDetails);
userRouter.route('/me/update').patch(updateProfile);
userRouter.route('/me/delete').delete(deleteUser);

// __________________________ Zone to testify __________________________
userRouter.route('/').get(async (req, res) => {
    res.status(200).json({ user: req.user, message: 'user is working' });
});

export default userRouter;
