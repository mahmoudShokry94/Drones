import { Request, Response } from "express";
import * as DroneSrvice from "../services/drone"
import Joi from 'joi';


export const createDrone = async (req: Request, res: Response) => {
    console.log('Controller...createDrone...')

    const schema = Joi.object({
        serialNumber: Joi.string()
            .min(1)
            .max(100)
            .required(),
        model: Joi.string()
            .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
            .required(),
        weightLimit: Joi.number()
            .min(0).max(500).required(),
    })

    const validationStatus = schema.validate(req.body)

    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }

    try {
        const response = await DroneSrvice.createDrone(req.body)

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);

    }


}

export const getDroneBatteryLevel = async (req: Request, res: Response) => {
    console.log('Controller...getDroneBatteryLevel...')


    const validationStatus = Joi.object({
        serialNumber: Joi.string()
            .min(1)
            .max(100)
            .required()
    }).validate(req.params)

    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }

    try {
        const response = await DroneSrvice.getDroneBatteryLevel({
            serialNumber: req.params.serialNumber
        })

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);

    }
}