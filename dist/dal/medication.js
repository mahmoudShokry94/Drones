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
exports.getMedication = exports.getDroneMedications = exports.createMedication = void 0;
const databaseManager_1 = require("../databaseManager");
const createMedication = (medication) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...createMedication...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.run(`INSERT INTO MEDICATIONS ('NAME','WEIGHT','CODE','IMAGE')VALUES('${medication.name}',${medication.weight},'${medication.code}','${medication.image}')`, function (err) {
            if (err) {
                err.errno === 19 ? reject({
                    status: 500,
                    message: "use Another medication code as it is unique"
                }) : reject({
                    status: 500,
                    message: "Cant Add Medication"
                });
            }
            return resolve("Medication Added Successfully");
        });
    });
});
exports.createMedication = createMedication;
const getDroneMedications = (droneSerialNumber) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...getDroneMedications...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.all(`SELECT MEDICATIONS.* FROM DRONE_MEDICATIONS,MEDICATIONS WHERE DRONE_MEDICATIONS.MEDICATION_ID=MEDICATIONS.CODE AND DRONE_MEDICATIONS.DRONE_ID='${droneSerialNumber}'`, function (err, rows) {
            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Drone Medications `
                });
            }
            resolve(rows !== null && rows !== void 0 ? rows : []);
        });
    });
});
exports.getDroneMedications = getDroneMedications;
const getMedication = ({ code }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dal...getMedication...');
    const db = (0, databaseManager_1.getDb)();
    return new Promise((resolve, reject) => {
        return db.all(`SELECT * FROM MEDICATIONS WHERE CODE='${code}'`, function (err, rows) {
            var _a;
            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Medication`
                });
            }
            resolve((_a = rows[0]) !== null && _a !== void 0 ? _a : {});
        });
    });
});
exports.getMedication = getMedication;
//# sourceMappingURL=medication.js.map