import * as SQLite from 'expo-sqlite';

let databaseInstance: SQLite.SQLiteDatabase | null = null;
export  const getDatabaseInstance=async()=>{
    if(!databaseInstance){
        databaseInstance = await SQLite.openDatabaseAsync('doctors_offline.db');
    }
    await databaseInstance.execAsync('CREATE TABLE IF NOT EXISTS doctors (id INTEGER PRIMARY KEY, name TEXT, specialty TEXT, experience INTEGER);')
    return databaseInstance;
}