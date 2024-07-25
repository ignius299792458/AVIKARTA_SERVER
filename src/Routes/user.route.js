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
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
} from '../Controllers/user.controller.js';
import { User } from '../models/user.model.js';
import authenticateUser from '../Middlewares/auth.middleware.js';

const userRouter = Router();
// const urlBodyParser = bodyParser.urlencoded({extended:false});
// const jsonBodyParser = bodyParser.json()

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/password/forgot').post(forgotPassword);
userRouter.route('/password/reset').patch(resetPassword);

userRouter.route('/logout').get(authenticateUser, logOut);
userRouter.route('/password/update').patch(authenticateUser, updatePassword);
userRouter.route('/me').get(authenticateUser, getUserDetails);
userRouter.route('/me/update').patch(authenticateUser, updateProfile);
userRouter.route('/me/delete').delete(authenticateUser, deleteUser);

// __________________________ Zone to testify __________________________
// for all Users
userRouter.route('/').get(authenticateUser, async (req, res) => {
    const alluser = await User.find();
    res.status(200).send(alluser);
});

export default userRouter;
