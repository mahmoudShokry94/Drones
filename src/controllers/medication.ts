import { Request, Response } from "express";
import * as MedicationService from "../services/medication";
import Joi from "joi";
import fs from 'fs'
import path from 'path'
import mimeType from 'mime-types'
import isError from "../utils/isError";

export const createMedication =
    async (req: Request & { file: any }, res: Response) => {
        console.log('Controller...createMedication...')

        const schema = Joi.object({
            name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9-_]{1,}$')).required(),
            weight: Joi.number()
                .required(),
            code: Joi.string().pattern(new RegExp('^[A-Z0-9_]{1,}$')).required()
        })

        const validationStatus = schema.validate(req.body)

        if (validationStatus.error) {
            res.status(400).send(validationStatus.error.details[0].message);
            return;
        }
        if (!req.file) {
            res.status(400).send('should upload file');
            return
        }

        try {

            fs.writeFileSync(path.resolve(`./src/uploads/${req.body.code}.${mimeType.extension(req.file.mimetype)}`), req.file.buffer)

            const response = await MedicationService.createMedication(Object.assign(req.body, { image: `${req.body.code}.${mimeType.extension(req.file.mimetype)}` }))

            res.status(200).send(
                {
                    message: "Medication Added Successfully"
                }
            );

        } catch (err) {

            if (isError(err)) {
                return res.status(err.status).send({ message: err.message });

            }

            return res.status(500).send({ message: err });
        }
    }


