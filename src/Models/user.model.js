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
            unique: [true, 'Please use unique Phone Number !'],
            index: true,
        },
        Email: {
            type: String,
            required: [true, 'Please enter your Email !!'],
            unique: [true, 'Please use unique email !!'],
            trim: true,
            index: true,
            validate: [validator.isEmail, 'Enter Valid email !'],
        },
        Password: {
            type: String,
            required: [true, 'Please Enter Your Password'],
            minLength: [4, 'Password should be greater than 4 characters'],
        },
        DateOfBirth: {
            type: Date,
            required: [true, 'Please provide the Date of Birth'],
        },
        Province: {
            type: String,
            required: [true, 'Please select your province !'],
        },
        District: {
            type: String,
            required: [true, 'Please select your district !'],
        },
        Municipality: {
            type: String,
            required: [true, 'Please select municipality !'],
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
            PublicId: String,
            SecureURL: String,
        },

        OTP: {
            type: Number,
            default: 903950,
        },
        resetPasswordExpire: {
            type: Date,
            default: undefined,
        },
        SelfAssured: {
            type: Number,
            default: 0,
        },
        // To Network Consistency
        MyLeader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        MyRequests: [],
        MyTeam: {
            type: String,
            default: null,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.Password;
                delete ret.OTP, delete ret.resetPasswordExpire;
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

userSchema.methods.changePassword = async function (newPassword) {
    console.log('\n\nbefore user: ', this.Password, this.Phone, this.FullName);
    this.Password = await bcrypt.hash(newPassword, 10);
    this.resetPasswordExpire = undefined;
    await this.save();
    if (this.checkPassword(newPassword)) {
        console.log('after changed: ', this.Password);
        return true;
    } else {
        return false;
    }
};

//  Access Token
userSchema.methods.generateAccessToken = function () {
    return Jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

// check password
userSchema.methods.checkPassword = async function (Password) {
    console.log('checkingPassword: ', Password);
    return (await bcrypt.compare(Password, this.Password)).valueOf(); // checking pswd
    // return (
    //     await bcrypt.compare(
    //         Password,
    //         '$2b$10$LrAtJM37zKmSyXFg8NHlSOvAdDjB1cTgvYFmEuZXWgxlQbJPtpDU.'
    //     )
    // ).valueOf(); // checking pswd
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
    console.log('\nbefore: ', this.OTP);
    const OTP = generateOTP();
    this.OTP = Number(OTP);
    this.resetPasswordExpire = Date.now() + 2 * 60 * 1000; // expires in 2 mins
    await this.save();
    console.log('after: ', this.OTP);
    return OTP;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
