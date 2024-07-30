import asyncHandler from '../Utils/asyncHandler.util.js';
import User from '../Models/user.model.js';
import ApiError from '../Utils/apiError.util.js';
import sendTokenResponse from '../Utils/sendTokenRes.util.js';
import sendEmail from '../Utils/sendEmail.util.js';

//registration
const registerUser = asyncHandler(async (req, res) => {
    try {
        // console.log(req.body);
        const { Email, Phone } = req.body;
        // phone checking
        const checkingUserPhoneExistAlready = await User.findOne({
            Phone: Phone,
        });
        if (checkingUserPhoneExistAlready) {
            throw new ApiError(409, 'Already used phone number.');
        }

        // email checking
        const checkingUserEmailExistAlready = await User.findOne({
            Email: Email,
        });

        if (checkingUserEmailExistAlready) {
            throw new ApiError(409, 'Already used email.');
        }

        const newUser = await User.create({ ...req.body });

        const createdUser = await User.findById(newUser._id).select(
            '-password'
        );

        if (!createdUser) {
            throw new ApiError(500, 'Registration Fail !!');
        }

        sendTokenResponse(201, newUser, res, 'Registration Successfull !! 😎');
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            Error: err.message,
        });
    }
});

// login
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { Phone, Password } = req.body;
        // console.log('login: req.body=> ', req.body);
        if (!Phone || !Password) {
            throw new ApiError(400, 'Phone or Password is missing!!');
        }
        const loggedUser = await User.findOne({ Phone: Phone }).select(
            '+Password'
        );

        if (!loggedUser) {
            throw new ApiError(404, 'User is not registered !! -> ');
        }
        const isPasswordMatched = await loggedUser.checkPassword(Password);

        if (isPasswordMatched) {
            sendTokenResponse(200, loggedUser, res, 'Login Successfull !! 😎');
        } else {
            throw new ApiError(401, 'Password Invalid !! 😣');
        }
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            Error: err.message,
        });
    }
});

//  forgetPassword
const forgotPassword = asyncHandler(async (req, res) => {
    try {
        const { Email, Phone } = req.body;
        const validUser = await User.findOne({
            $or: [{ Email }, { Phone }],
        });
        if (!validUser) {
            throw new ApiError(404, 'Email or Phone Number is found !!');
        }

        // Reset password Token
        const resetToken = await validUser.getResetPswdToken();

        await validUser.save({ validateBeforeSave: false });

        const message = `Your OTP is : ${resetToken} \n\n Please delete email after OTP is used and don't share to anybody this OTP. \n\n This OTP will expire after 2 mins.`;

        await sendEmail({
            email: validUser.Email,
            subject: 'AVIKARTA: Reset OTP',
            mailContent: message,
        });

        res.status(200).json({
            success: true,
            message: `Email is sent to ${validUser.Email} successfully`,
        });
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});

//  resetPassword
const resetPassword = asyncHandler(async (req, res) => {
    try {
        console.log('reset password: ', req.body);
        const { Phone, OTP } = req.body;

        const resetUser = await User.findOne({
            Phone: Phone,
        });

        if (Date.now() <= resetUser.resetPasswordExpire)
            throw new ApiError(400, 'Reset OTP is Expired !');

        // save confirmed password
        if (resetUser.OTP === OTP) {
            // await rese;
            resetUser.resetPasswordExpire = undefined;
            await resetUser.save();

            res.status(200).json({
                status: 200,
                message: 'Reset Password Successfull !! 😎',
            });
        } else {
            throw new ApiError(400, 'Wrong OTP !!');
        }
    } catch (err) {
        res.status(500).json({
            statusCode: 400,
            message: err.message,
        });
    }
});

// -------> required authenticated tokenization routes <---------

// logout
const logOut = asyncHandler(async (req, res) => {
    // Clear token from client-side storage (e.g., cookies or local storage)
    // res.clearCookie('jwtToken'); // Example for clearing cookie

    if (req.user) {
        res.status(200).json({
            success: true,
            logStatus: 'checkout',
            message: req.user.FullName + ' is logged out successfully !!',
        });
    }
});

// updatePassword
const updatePassword = asyncHandler(async (req, res) => {
    try {
        // console.log("update pswd:: ", req.user, req.body);
        const user = await User.findOne(req.user._id).select('+Password');
        if (!user) {
            throw new ApiError(401, 'User is not verified !!');
        }

        const { oldPassword, newPassword } = req.body;
        const checkCurrentGivePswd = await user.checkPassword(oldPassword);
        if (!checkCurrentGivePswd) {
            throw new ApiError(400, 'Old Password is incorrect !!');
        }

        // update pswd with confirmPassword
        user.Password = newPassword;
        await user.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Password Updated Successfully !! 😎',
        });
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});

//  getUserDetails
const getUserDetails = asyncHandler(async (req, res) => {
    try {
        // const user = await User.findOne(req.user._id);
        // if (!user) {
        //     throw new ApiError(404, "Users' detail is not found !!");
        // }

        // res.status(200).json({
        //     statusCode: 200,
        //     user: user,
        //     message: 'User Details !! 😎',
        // });

        if (req.user) {
            res.status(200).json({
                statusCode: 200,
                user: req.user,
                message: 'User Details !! 😎',
            });
        }
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});

// update Profile
const updateProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'update profile' });
});

const deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Delete user portal' });
});

export {
    registerUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    deleteUser,
};
