"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDroneAuditLog = exports.loadDroneMedications = exports.getDrones = exports.getDrone = exports.createDrone = void 0;
const databaseManager_1 = require("../databaseManager");
const createDrone = (drone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...createDrone...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.run(`INSERT INTO DRONES ('SERIAL_NUMBER','MODEL','WEIGTH_LIMIT')VALUES(${drone.serialNumber},'${drone.model}',${drone.weightLimit})`, function (err) {
            if (err) {
                if (err) {
                    err.errno === 19 ? reject({
                        status: 500,
                        message: "use Another drone serial number as it is unique"
                    }) : reject({
                        status: 500,
                        message: "cant Add Drone"
                    });
                }
            }
            return resolve("Drone Added Successfully");
        });
    });
});
exports.createDrone = createDrone;
const getDrone = (drone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...getDrone...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.all(`SELECT * FROM DRONES WHERE SERIAL_NUMBER = ${drone.serialNumber}`, function (err, rows) {
            var _a;
            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Drone with Serial ${drone.serialNumber}`
                });
            }
            resolve((_a = rows[0]) !== null && _a !== void 0 ? _a : {});
        });
    });
});
exports.getDrone = getDrone;
const getDrones = (drone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...getDrones...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.all(`SELECT * FROM DRONES ${(drone === null || drone === void 0 ? void 0 : drone.state) ? `WHERE STATE = ${drone.state}` : ``}`, function (err, rows) {
            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Drones`
                });
            }
            resolve(rows !== null && rows !== void 0 ? rows : []);
        });
    });
});
exports.getDrones = getDrones;
const loadDroneMedications = (droneId, medicationId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...loadDroneMedications...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.run(`INSERT INTO DRONE_MEDICATIONS ('MEDICATION_ID','DRONE_ID') VALUES ('${medicationId}','${droneId}')`, function (err) {
            if (err) {
                if (err) {
                    err.errno === 19 ? reject({
                        status: 500,
                        message: "use Another drone serial number and medication code as the used before"
                    }) : reject({
                        status: 500,
                        message: "Cant load Medication to drone"
                    });
                }
            }
            return resolve("Medications Loaded Successfully");
        });
    });
});
exports.loadDroneMedications = loadDroneMedications;
const addDroneAuditLog = (droneId, batteryCapacity) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...addDroneAuditLog...');
    const db = (0, databaseManager_1.getDb)();
    db.run(`INSERT INTO DRONE_BATTERY_LOG ('DRONE_ID','BATTERY_CAPACITY') VALUES ('${droneId}',${batteryCapacity})`);
});
exports.addDroneAuditLog = addDroneAuditLog;
//# sourceMappingURL=drone.js.map