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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseManager_1 = require("./databaseManager");
const droneController = __importStar(require("./controllers/drone"));
const medicationController = __importStar(require("./controllers/medication"));
const multer_1 = __importDefault(require("multer"));
(0, databaseManager_1.initDB)();
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Storage configuration for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the stored file
    },
});
const upload = (0, multer_1.default)();
app.post('/drone', droneController.createDrone);
app.get('/drone/idle', droneController.getIdleDrones);
app.get('/drone/:serialNumber', droneController.getDrone);
app.get('/drone/:serialNumber/medications', droneController.getDroneMedications);
app.post('/drone/:serialNumber/medications', droneController.loadDroneMedications);
app.post('/medication', upload.single('image'), medicationController.createMedication);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
process.on('exit', function () {
    (0, databaseManager_1.getDb)().close(function (err) {
        if (err) {
            return console.error({message:err.message});
        }
        console.log('Close the database connection.');
    });
});
//# sourceMappingURL=index.js.map