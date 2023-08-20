import Drone from "../types/Drone"
import * as DroneDal from "../dal/drone"

export const createDrone = async (drone: Drone) => {
    console.log('Service...createDrone...')

    return await DroneDal.createDrone(drone)
}

export const getDroneBatteryLevel = async (drone: Pick<Drone, 'serialNumber'>) => {
    console.log('Service...getDroneBatteryLevel...')

    return await DroneDal.getDroneBatteryLevel(drone)
}