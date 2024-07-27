import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
    {
        Name: {
            // Name of Team will be Automatically Team Creator
            type: String,
            required: [true, 'TeamName is necessary'],
            trim: true,
            index: true,
        },
        Members: [],
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

export const Team = mongoose.model('Team', teamSchema);
