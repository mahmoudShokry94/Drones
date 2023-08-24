"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDroneMedications = exports.getDroneMedications = exports.getIdleDrones = exports.getDrone = exports.createDrone = void 0;
const DroneService = __importStar(require("../services/drone"));
const MedicationService = __importStar(require("../services/medication"));
const joi_1 = __importDefault(require("joi"));
const isError_1 = __importDefault(require("../utils/isError"));
const createDrone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Controller...createDrone...');
    const schema = joi_1.default.object({
        serialNumber: joi_1.default.string()
            .min(1)
            .max(100)
            .required(),
        model: joi_1.default.string()
            .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
            .required(),
        weightLimit: joi_1.default.number()
            .min(0).max(500).required(),
    });
    const validationStatus = schema.validate(req.body);
    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }
    try {
        const response = yield DroneService.createDrone(req.body);
        res.status(200).send(response);
    }
    catch (err) {
        if ((0, isError_1.default)(err)) {
            return res.status(err.status).send({message:err.message});
        }
        return res.status(500).send({message:err});
    }
});
exports.createDrone = createDrone;
const getDrone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Controller...getDrone...');
    const validationStatus = joi_1.default.object({
        serialNumber: joi_1.default.string()
            .min(1)
            .max(100)
            .required()
    }).validate(req.params);
    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }
    try {
        const response = yield DroneService.getDrone({
            serialNumber: req.params.serialNumber
        });
        res.status(200).send(response);
    }
    catch (err) {
        if ((0, isError_1.default)(err)) {
            return res.status(err.status).send({message:err.message});
        }
        return res.status(500).send({message:err});
    }
});
exports.getDrone = getDrone;
const getIdleDrones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Controller...getIdleDrones...');
    try {
        const response = yield DroneService.getIdleDrones();
        res.status(200).send(response);
    }
    catch (err) {
        if ((0, isError_1.default)(err)) {
            return res.status(err.status).send({message:err.message});
        }
        return res.status(500).send({message:err});
    }
});
exports.getIdleDrones = getIdleDrones;
const getDroneMedications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Controller...getDroneMedications...');
    const validationStatus = joi_1.default.object({
        serialNumber: joi_1.default.string()
            .required()
    }).validate(req.params);
    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }
    try {
        const response = yield DroneService.getDroneMedications(req.params.serialNumber);
        res.status(200).send(response);
    }
    catch (err) {
        if ((0, isError_1.default)(err)) {
            return res.status(err.status).send({message:err.message});
        }
        return res.status(500).send({message:err});
    }
});
exports.getDroneMedications = getDroneMedications;
const loadDroneMedications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Controller...loadDroneMedications...');
    const validationStatus = joi_1.default.object({
        serialNumber: joi_1.default.string()
            .required(),
        medicationCode: joi_1.default.string()
            .required(),
    }).validate(Object.assign(req.body, req.params));
    if (validationStatus.error) {
        res.status(400).send(validationStatus.error.details[0].message);
        return;
    }
    const medication = yield MedicationService.getMedication({
        code: req.body.medicationCode
    });
    const drone = yield DroneService.getDrone({
        serialNumber: req.params.serialNumber
    });
    if (!Object.keys(drone).length) {
        res.status(404).send(`there is no drone with this serial ${req.params.serialNumber}`);
        return;
    }
    if (!Object.keys(medication).length) {
        res.status(404).send(`there is no medication with this code ${req.body.medicationCode}`);
        return;
    }
    const droneMedicationsTotalWeight = ((_a = (yield DroneService.getDroneMedications(req.body.serialNumber))) !== null && _a !== void 0 ? _a : []).reduce((prev, curr) => prev += curr['WEIGHT'], 0);
    if (drone['WEIGTH_LIMIT'] < Number(droneMedicationsTotalWeight + medication['WEIGHT'])) {
        res.status(400).send('there no enough space on drone');
        return;
    }
    try {
        const response = yield DroneService.loadDroneMedications(req.params.serialNumber, req.body.medicationCode);
        res.status(200).send(response);
    }
    catch (err) {
        if ((0, isError_1.default)(err)) {
            return res.status(err.status).send({message:err.message});
        }
        return res.status(500).send({message:err});
    }
});
exports.loadDroneMedications = loadDroneMedications;
//# sourceMappingURL=drone.js.map