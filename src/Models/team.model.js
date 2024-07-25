import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
    {
        TeamName: {
            // Name of Team will be Automatically Team Creator
            type: String,
            required: [true, 'TeamName is necessary'],
            trim: true,
            index: true,
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

export const User = mongoose.model('Team', teamSchema);
