
import { Medication } from "../types"
import * as MedicationDal from "../dal/medication"


export const createMedication = async (medication: Medication) => {
    console.log('Service...createMedication...')

    return await MedicationDal.createMedication(medication)
}

export const getMedication = async (filters: Pick<Medication,'code'>) => {
    console.log('Service...getMedication...')

    return await MedicationDal.getMedication(filters)
}
