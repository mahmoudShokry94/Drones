import { Request, Response } from "express";
import * as DroneService from "../services/drone"
import * as MedicationService from "../services/medication"
import Joi from 'joi';
import isError from "../utils/isError";


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

        await DroneService.createDrone(req.body)

        res.status(200).send({
            message: "Drone Added Successfully"
        });
    } catch (err) {

        if (isError(err)) {
            return res.status(err.status).send({ message: err.message });

        }

        return res.status(500).send({ message: err });
    }


}

export const getDrone = async (req: Request, res: Response) => {
    console.log('Controller...getDrone...')

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
        const response = await DroneService.getDrone({
            serialNumber: req.params.serialNumber
        })

        res.status(200).send({
            data: response,
            message: "Drone Retrieved Successfully"
        })
    } catch (err) {
        if (isError(err)) {
            return res.status(err.status).send({ message: err.message });

        }

        return res.status(500).send({ message: err });
    }
}

export const getIdleDrones = async (_req: Request, res: Response) => {
    console.log('Controller...getIdleDrones...')

    try {

        const response = await DroneService.getIdleDrones()

        res.status(200).send({
            data: response,
            message: "Drones Retrieved Successfully"
        })
    } catch (err) {

        if (isError(err)) {
            return res.status(err.status).send({ message: err.message });
        }

        return res.status(500).send({ message: err });

    }
}

export const getDroneMedications = async (req: Request, res: Response) => {
    console.log('Controller...getDroneMedications...')

    const validationStatus = Joi.object({
        serialNumber: Joi.string()
            .required()
    }).validate(req.params)

    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }

    try {
        const response = await DroneService.getDroneMedications(req.params.serialNumber)

        res.status(200).send({
            data: response,
            message: "Drone Medications Retrieved Successfully"
        })
    } catch (err) {
        if (isError(err)) {
            return res.status(err.status).send({ message: err.message });
        }
        return res.status(500).send({ message: err });

    }
}

export const loadDroneMedications = async (req: Request, res: Response) => {
    console.log('Controller...loadDroneMedications...')

    const validationStatus = Joi.object({
        serialNumber: Joi.string()
            .required(),
        medicationCode: Joi.string()
            .required(),
    }).validate(Object.assign(req.body, req.params))

    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }
    const medication = await MedicationService.getMedication({
        code: req.body.medicationCode
    })
    const drone = await DroneService.getDrone({
        serialNumber: req.params.serialNumber
    })

    if (!Object.keys(drone).length) {
        res.status(404).send(`there is no drone with this serial ${req.params.serialNumber}`)
        return
    }

    if (!Object.keys(medication).length) {
        res.status(404).send(`there is no medication with this code ${req.body.medicationCode}`)
        return
    }

    const droneMedicationsTotalWeight = (await DroneService.getDroneMedications(req.body.serialNumber) as Array<{}> ?? []).reduce((prev, curr) => prev += curr['WEIGHT'], 0)

    if (drone['WEIGTH_LIMIT']! < Number(droneMedicationsTotalWeight + medication['WEIGHT'])) {
        res.status(400).send('there no enough space on drone')
        return
    }

    try {
        await DroneService.loadDroneMedications(req.params.serialNumber, req.body.medicationCode)

        res.status(200).send({
            message: "Drone Medications Loaded Successfully"
        })
    } catch (err) {
        if (isError(err)) {
            return res.status(err.status).send({ message: err.message });

        }
        return res.status(500).send({ message: err });
    }
}

