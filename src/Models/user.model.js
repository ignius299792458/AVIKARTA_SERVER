import mongoose, { Mongoose } from 'mongoose';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        FullName: {
            type: String,
            required: [true, 'Please enter your full name !'],
            trim: true,
            index: true,
        },
        Phone: {
            type: String,
            required: [true, 'Please enter your phone number. !!'],
            maxLength: [15, 'Invalid Phone Number Length !!'],
            minLength: [10, 'Invalid Phone Number Length !!'],
            trim: true,
            unique: true,
            index: true,
        },
        Email: {
            type: String,
            required: [true, 'Please enter your Email !!'],
            unique: true,
            trim: true,
            index: true,
            validate: [validator.isEmail, 'Enter Valid email !'],
        },
        Password: {
            type: String,
            required: [true, 'Please Enter Your Password'],
            minLength: [4, 'Password should be greater than 4 characters'],
            select: false,
        },
        Province: {
            type: String,
            required: [true, 'Please select your province !'],
        },
        District: {
            type: String,
            required: [true, 'Please select your district !'],
        },
        InsuranceCompanyCategory: {
            type: String,
            required: [true, 'Please select your company category'],
        },
        NameOfInsuranceCompany: {
            type: String,
            required: [true, 'Please select your company'],
        },
        AgentCode: {
            type: String,
        },
        Avatar: {
            type: String,
        },

        OTP: {
            type: Number,
            default: 913949,
        },
        resetPasswordExpire: Date,
        // To Team Consistency
        MyLeader: {
            type: String,
        },
        MyClient: [],
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.Password;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    // carefully don't use () => for this middleware
    //  fallsafe for password edited due to user update
    if (!this.isModified('Password')) {
        return next();
    }
    this.Password = await bcrypt.hash(this.Password, 10); // encryption
    next();
});

//  Access Token
userSchema.methods.generateAccessToken = function () {
    return Jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

// check password
userSchema.methods.checkPassword = async function (Password) {
    return (await bcrypt.compare(Password, this.Password)).valueOf(); // checking pswd
};

// six Code OTP generator
function generateOTP() {
    let code = Math.floor(100000 + Math.random() * 900000); // Generate a random number between 100000 and 999999

    // Check if the code is exactly six digits
    while (code.toString().length !== 6) {
        code = Math.floor(100000 + Math.random() * 900000);
    }

    return code;
}

// Generating psswd reset token
userSchema.methods.getResetPswdToken = async function () {
    // hashing and adding resetpsswd token
    const OTP = generateOTP();
    this.resetPasswordToken = OTP;
    this.resetPasswordExpire = Date.now() + 2 * 60 * 1000; // expires in 2 mins
    return OTP;
};

export const User = mongoose.model('User', userSchema);
