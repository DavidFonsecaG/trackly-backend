import { RequestHandler } from "express";
import TrackerConfig from "../models/TrackerConfig";
import { defaultConfig } from "../config/defaultConfig";

const serialize = (config: any) => ({
    applicationTypes: config.applicationTypes,
    terms: config.terms,
    programs: config.programs,
    schedules: config.schedules,
});

export const getConfig: RequestHandler = async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        let config = await TrackerConfig.findOne({ userId });
        if (!config) {
            config = await TrackerConfig.create({ userId, ...defaultConfig });
        }
        res.status(200).json(serialize(config));
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tracker config" });
    }
};

export const updateConfig: RequestHandler = async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const { applicationTypes, terms, programs, schedules } = req.body;

        const config = await TrackerConfig.findOneAndUpdate(
            { userId },
            { $set: { applicationTypes, terms, programs, schedules } },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json(serialize(config));
    } catch (err) {
        res.status(500).json({ message: "Failed to update tracker config" });
    }
};
