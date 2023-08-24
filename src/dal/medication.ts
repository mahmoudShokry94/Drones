import { getDb } from "../databaseManager"
import { Medication } from "../types"

export const createMedication = async (medication: Medication) => {
    console.log('Dal...createMedication...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.run(`INSERT INTO MEDICATIONS ('NAME','WEIGHT','CODE','IMAGE')VALUES('${medication.name}',${medication.weight},'${medication.code}','${medication.image}')`, function (err) {
            if (err) {
                err.errno === 19 ? reject({
                    status: 500,
                    message: "use Another medication code as it is unique"
                }) : reject({
                    status: 500,
                    message: "Cant Add Medication"
                })
            }
            return resolve("Medication Added Successfully");
        })
    })

}

export const getDroneMedications = async (droneSerialNumber: string): Promise<Medication[]> => {
    console.log('Dal...getDroneMedications...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.all(`SELECT MEDICATIONS.* FROM DRONE_MEDICATIONS,MEDICATIONS WHERE DRONE_MEDICATIONS.MEDICATION_ID=MEDICATIONS.CODE AND DRONE_MEDICATIONS.DRONE_ID='${droneSerialNumber}'`, function (err, rows) {

            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Drone Medications `
                })
            }
            resolve(rows ?? [])
        })
    })

}

export const getMedication = async ({ code }: Pick<Medication, 'code'>): Promise<Medication> => {
    console.log('Dal...getMedication...')

    const db = getDb()

    return new Promise((resolve, reject) => {
        return db.all(`SELECT * FROM MEDICATIONS WHERE CODE='${code}'`, function (err, rows) {

            if (err) {
                reject({
                    status: 500,
                    message: `Cant Get Medication`
                })
            }
            resolve(rows[0] ?? {})
        })
    })

}
