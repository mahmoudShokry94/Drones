import express from 'express'
import { getDb, initDB } from './databaseManager'
import * as droneController from "./controllers/drone"

initDB()
const port = 3000
const app = express()

app.use(express.json());

app.post('/drone', droneController.createDrone)

app.get('/drone/:serialNumber', droneController.getDroneBatteryLevel)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

process.on('exit', function () {
    getDb().close(function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
})