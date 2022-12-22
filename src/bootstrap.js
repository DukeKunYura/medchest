//import * as SQLite from 'expo-sqlite';
//import { initDB } from '../src/db'
//const db = SQLite.openDatabase('medication.db');

export async function bootstrap() {
    try {
        //await initDB()

        await new Promise(resolve => setTimeout(resolve, 2000));
        return console.log("bootstrap with DB is load");
    } catch (e) {
        console.log('Error -> ', e)
    }

}