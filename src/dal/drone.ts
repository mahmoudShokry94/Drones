import { getDb } from "../databaseManager"
import Drone from "../types/Drone"

export const createDrone = async (drone: Drone) => {
    console.log('Dal...createDrone...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.run(`INSERT INTO drone('SERIAL_NUMBER','MODEL','WEIGTH_LIMIT')VALUES(${drone.serialNumber},'${drone.model}',${drone.weightLimit})`, function (err) {
            if (err) {
                reject("Cant Add Drone")
            }
            return resolve("Drone Added Successfully");
        })
    })

}

export const getDroneBatteryLevel = async (drone: Pick<Drone, 'serialNumber'>) => {
    console.log('Dal...getDroneBatteryLevel...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.all(`SELECT BATTERY_CAPACITY As batteryCapacity FROM DRONE WHERE SERIAL_NUMBER = ${drone.serialNumber}`, function (err, rows) {
            if (err) {
                reject(`Cant Get Drone with Serial ${drone.serialNumber}`)
            }
            if(rows.length >0) resolve(rows[0])
        })
    })

}