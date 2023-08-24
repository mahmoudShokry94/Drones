import express from 'express'
import { getDb, initDB } from './databaseManager'
import * as droneController from "./controllers/drone"
import * as medicationController from "./controllers/medication"
import multer from 'multer'

initDB()
const port = 3000
const app = express()

app.use(express.json());

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the stored file
    },
});

const upload = multer();

app.post('/drone', droneController.createDrone)

app.get('/drone/idle', droneController.getIdleDrones)

app.get('/drone/:serialNumber', droneController.getDrone)

app.get('/drone/:serialNumber/medications', droneController.getDroneMedications)

app.post('/drone/:serialNumber/medications', droneController.loadDroneMedications)

app.post('/medication', upload.single('image'), medicationController.createMedication)



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

process.on('exit', function () {
    getDb().close(function (err) {
        if (err) {
            return console.error({message:err.message});
        }
        console.log('Close the database connection.');
    });
})