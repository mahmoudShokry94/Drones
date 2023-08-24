import { Drone } from "../types"
import * as DroneDal from "../dal/drone"
import * as MedicationDal from "../dal/medication"
import cron from 'node-cron'

export const createDrone = async (drone: Drone) => {
    console.log('Service...createDrone...')

    return await DroneDal.createDrone(drone)
}

export const getDrone = async ({ serialNumber }: Pick<Drone, 'serialNumber'>) => {
    console.log('Service...getDrone...')

    const drone = await DroneDal.getDrone({ serialNumber })

    if (!Object.keys(drone).length) {
        throw {
            status: 404,
            message: 'drone not found'
        }
    }

    return drone
}

export const getIdleDrones = async () => {
    console.log('Service...getIdleDrones...')

    return await DroneDal.getDrones({ state: 'IDLE' })
}

export const getDroneMedications = async (serialNumber: string) => {
    console.log('Service...getDroneMedications...')

    if (!await checkDroneExistence(serialNumber)) {
        throw ({
            status: 404,
            message: 'there is no drone with this code'
        })
    }
    return await MedicationDal.getDroneMedications(serialNumber)
}

export const checkDroneExistence = async (serialNumber: string) => {
    console.log('service...checkDroneExistence...')

    const drone = await getDrone({
        serialNumber
    })
    if (!Object.keys(drone).length) {
        return false
    }
    return true
}

export const loadDroneMedications = async (droneId: string, medicationId: string) => {
    console.log('service...loadDroneMedications...')

    return await DroneDal.loadDroneMedications(droneId, medicationId)
}

cron.schedule('* * * * *', async () => {
    console.log('check drone battery every minute');

    const drones = await DroneDal.getDrones()

    drones.forEach(async (drone) => {
        await DroneDal.addDroneAuditLog(drone['SERIAL_NUMBER'], drone['BATTERY_CAPACITY'])
    })

});