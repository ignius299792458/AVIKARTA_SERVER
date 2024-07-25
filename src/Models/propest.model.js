const prospectSchema = new mongoose.Schema(
    {
        CreatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
            index: true,
        },
        Email: {
            type: String,
            trim: true,
            index: true,
            validate: [validator.isEmail, 'Enter Valid email !'],
        },
        SumExpected: {
            type: Number,
        },
        Province: {
            type: String,
            required: [true, 'Please select province !'],
        },
        District: {
            type: String,
            required: [true, 'Please select district !'],
        },
        Address: {
            type: String,
            required: [true, 'Please  provide address !'],
        },
        Avatar: {
            type: String,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

export const User = mongoose.model('Prospect', prospectSchema);
