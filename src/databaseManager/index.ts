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
        db.exec("CREATE TABLE IF NOT EXISTS DRONE ( SERIAL_NUMBER varchar(100) PRIMARY KEY, MODEL  TEXT  CHECK( MODEL IN ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')), WEIGTH_LIMIT int CHECK(WEIGTH_LIMIT BETWEEN 0 AND 500), BATTERY_CAPACITY int DEFAULT 100 CHECK(BATTERY_CAPACITY BETWEEN 0 AND 100), STATE CHECK( STATE IN('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') ) DEFAULT 'IDLE')")
    }
    console.log("Connection with SQLite has been established");
    return db;
}
// open database in memory
export const getDb = function getDb() {
    return db;
};



