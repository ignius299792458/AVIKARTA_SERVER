import asyncHandler from '../Utils/asyncHandler.util.js';
import ApiError from '../Utils/apiError.util.js';
import { ObjectId } from 'mongodb';
import { Client } from '../Models/client.model.js';

export const selfAssuredReport = asyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'User Session expired!! Try Re Login !');
        }

        const allMyClients = await Client.find({
            OwnedBy: new ObjectId(String(req.user._id)),
        });

        // self assured
        let selfAssuredValue = 0;
        allMyClients.forEach((client, _) => {
            selfAssuredValue += client.ClientInsuranceInfo.SumAssured;
        });

        res.status(200).json({
            data: allMyClients.map((client, _) => ({
                clientName: client.FullName,
                sumAssured: client.ClientInsuranceInfo.SumAssured,
            })),
            selfAssuredValue: selfAssuredValue,
            message: 'self Assured Report submitted successfully. !! 😟',
        });
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});

export const totalTeamBudgetReport = asyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'User Session expired!! Try Re Login !');
        }
        res.status(200).json({
            message: 'Total Team Budget Report submitted successfully!!',
            data: {},
        });
    } catch (err) {
        res.status(500).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
});
