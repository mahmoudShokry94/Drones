import * as sqlite3 from 'sqlite3'

let db;

export const initDB = () => {
    console.log("Initiate Database")
    if (!db) {
        let sqlite = sqlite3.verbose()
        db = new sqlite.Database('src/databaseManager/db.db', sqlite3.OPEN_READWRITE, (error) => {
            if (error) {
                return console.error(error.message);
            }
        });
        db.exec("CREATE TABLE IF NOT EXISTS DRONES ( SERIAL_NUMBER varchar(100) PRIMARY KEY, MODEL  TEXT  CHECK( MODEL IN ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')), WEIGTH_LIMIT int CHECK(WEIGTH_LIMIT BETWEEN 0 AND 500), BATTERY_CAPACITY int DEFAULT 100 CHECK(BATTERY_CAPACITY BETWEEN 0 AND 100), STATE CHECK( STATE IN('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') ) DEFAULT 'IDLE')")
        db.exec("CREATE TABLE IF NOT EXISTS MEDICATIONS ( NAME varchar(100) , WEIGHT int , CODE varchar(100) , IMAGE varchar(255) , UNIQUE(CODE))")
        db.exec("CREATE TABLE IF NOT EXISTS DRONE_MEDICATIONS ( MEDICATION_ID varchar(100) , DRONE_ID varchar(100)  ,PRIMARY KEY(MEDICATION_ID,DRONE_ID), FOREIGN KEY (MEDICATION_ID) REFERENCES MEDICATIONS(CODE),FOREIGN KEY (DRONE_ID) REFERENCES DRONES(SERIAL_NUMBER))")
        db.exec("CREATE TABLE IF NOT EXISTS DRONE_BATTERY_LOG ( DRONE_ID varchar(100) , BATTERY_CAPACITY int DEFAULT 100 CHECK(BATTERY_CAPACITY BETWEEN 0 AND 100) , CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP , FOREIGN KEY (DRONE_ID) REFERENCES DRONES(SERIAL_NUMBER))")

    }
    console.log("Connection with SQLite has been established");
    return db;
}
// open database in memory
export const getDb = function getDb() {
    return db;
};



