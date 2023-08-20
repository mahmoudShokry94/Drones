export default interface Drone {
    serialNumber: string,
    model: 'Lightweight' | 'Middleweight' | 'Cruiserweight' | 'Heavyweight',
    weightLimit: number,
    batteryCapacity: number,
    state: 'IDLE' | 'LOADING' | 'LOADED' | 'DELIVERING' | 'DELIVERED' | 'RETURNING'
}