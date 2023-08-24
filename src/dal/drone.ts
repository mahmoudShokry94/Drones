import { getDb } from "../databaseManager"
import { Drone } from "../types"

export const createDrone = async (drone: Drone) => {
    console.log('Dal...createDrone...')

    const db = getDb()

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
                    })
                }
            }
            return resolve("Drone Added Successfully");
        })
    })

}

export const getDrone = async (drone: Pick<Drone, 'serialNumber'>): Promise<Drone> => {
    console.log('Dal...getDrone...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.all(`SELECT * FROM DRONES WHERE SERIAL_NUMBER ='${drone.serialNumber}'`, function (err, rows) {

            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Drone with Serial ${drone.serialNumber}`
                })
            }
            resolve(rows[0] ?? {})
        })
    })

}

export const getDrones = async (drone?: Pick<Drone, 'state'>): Promise<Drone[]> => {
    console.log('Dal...getDrones...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.all(`SELECT * FROM DRONES ${drone?.state ? ` WHERE STATE = '${drone.state}'` : ``}`, function (err, rows) {

            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Drones`
                })
            }
            resolve(rows ?? [])
        })
    })

}

export const loadDroneMedications = async (droneId: string, medicationId: string) => {
    console.log('Dal...loadDroneMedications...')

    const db = getDb()

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
                    })
                }
            }
            return resolve("Medications Loaded Successfully");
        })
    })

}

export const addDroneAuditLog = async (droneId: string, batteryCapacity: number) => {
    console.log('Dal...addDroneAuditLog...')

    const db = getDb()

    db.run(`INSERT INTO DRONE_BATTERY_LOG ('DRONE_ID','BATTERY_CAPACITY') VALUES ('${droneId}',${batteryCapacity})`)

}