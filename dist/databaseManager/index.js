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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.initDB = void 0;
const sqlite3 = __importStar(require("sqlite3"));
let db;
const initDB = () => {
    console.log("Initiate Database");
    if (!db) {
        let sqlite = sqlite3.verbose();
        db = new sqlite.Database('src/databaseManager/db.db', sqlite3.OPEN_READWRITE, (error) => {
            if (error) {
                return console.error(error.message);
            }
        });
        db.exec("CREATE TABLE IF NOT EXISTS DRONES ( SERIAL_NUMBER varchar(100) PRIMARY KEY, MODEL  TEXT  CHECK( MODEL IN ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')), WEIGTH_LIMIT int CHECK(WEIGTH_LIMIT BETWEEN 0 AND 500), BATTERY_CAPACITY int DEFAULT 100 CHECK(BATTERY_CAPACITY BETWEEN 0 AND 100), STATE CHECK( STATE IN('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') ) DEFAULT 'IDLE')");
        db.exec("CREATE TABLE IF NOT EXISTS MEDICATIONS ( NAME varchar(100) , WEIGHT int , CODE varchar(100) , IMAGE varchar(255) , UNIQUE(CODE))");
        db.exec("CREATE TABLE IF NOT EXISTS DRONE_MEDICATIONS ( MEDICATION_ID varchar(100) , DRONE_ID varchar(100)  ,PRIMARY KEY(MEDICATION_ID,DRONE_ID), FOREIGN KEY (MEDICATION_ID) REFERENCES MEDICATIONS(CODE),FOREIGN KEY (DRONE_ID) REFERENCES DRONES(SERIAL_NUMBER))");
        db.exec("CREATE TABLE IF NOT EXISTS DRONE_BATTERY_LOG ( DRONE_ID varchar(100) , BATTERY_CAPACITY int DEFAULT 100 CHECK(BATTERY_CAPACITY BETWEEN 0 AND 100) , CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP , FOREIGN KEY (DRONE_ID) REFERENCES DRONES(SERIAL_NUMBER))");
        db.all(`SELECT * FROM DRONE_BATTERY_LOG`, function (err, rows) {
            console.log({ rows });
        });
    }
    console.log("Connection with SQLite has been established");
    return db;
};
exports.initDB = initDB;
// open database in memory
const getDb = function getDb() {
    return db;
};
exports.getDb = getDb;
//# sourceMappingURL=index.js.map