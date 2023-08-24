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
exports.loadDroneMedications = exports.checkDroneExistence = exports.getDroneMedications = exports.getIdleDrones = exports.getDrone = exports.createDrone = void 0;
const DroneDal = __importStar(require("../dal/drone"));
const MedicationDal = __importStar(require("../dal/medication"));
const node_cron_1 = __importDefault(require("node-cron"));
const createDrone = (drone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Service...createDrone...');
    return yield DroneDal.createDrone(drone);
});
exports.createDrone = createDrone;
const getDrone = (drone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Service...getDrone...');
    return yield DroneDal.getDrone(drone);
});
exports.getDrone = getDrone;
const getIdleDrones = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Service...getIdleDrones...');
    return yield DroneDal.getDrones({ state: 'IDLE' });
});
exports.getIdleDrones = getIdleDrones;
const getDroneMedications = (serialNumber) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Service...getDroneMedications...');
    if (!(yield (0, exports.checkDroneExistence)(serialNumber))) {
        throw ({
            status: 404,
            message: 'there is no drone with this code'
        });
    }
    return yield MedicationDal.getDroneMedications(serialNumber);
});
exports.getDroneMedications = getDroneMedications;
const checkDroneExistence = (serialNumber) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('service...checkDroneExistence...');
    const drone = yield (0, exports.getDrone)({
        serialNumber
    });
    if (!Object.keys(drone).length) {
        return false;
    }
    console.log('true');
    return true;
});
exports.checkDroneExistence = checkDroneExistence;
const loadDroneMedications = (droneId, medicationId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('service...loadDroneMedications...');
    return yield DroneDal.loadDroneMedications(droneId, medicationId);
});
exports.loadDroneMedications = loadDroneMedications;
node_cron_1.default.schedule('* * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('check drone battery every minute');
    const drones = yield DroneDal.getDrones();
    drones.forEach((drone) => __awaiter(void 0, void 0, void 0, function* () {
        yield DroneDal.addDroneAuditLog(drone['SERIAL_NUMBER'], drone['BATTERY_CAPACITY']);
    }));
}));
//# sourceMappingURL=drone.js.map