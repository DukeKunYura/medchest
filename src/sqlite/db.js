import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('medication.db');

export function initDB() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS medication (id INTEGER PRIMARY KEY AUTOINCREMENT, name NOT NULL, category TEXT NOT NULL, expiration TEXT NOT NULL, quantity TEXT, freeze TEXT, note TEXT)',
                [],
                resolve,
                (_, error) => reject(error)
            )
        })
    })
};

export function getMedicationsDB() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM medication',
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => reject(error)
            )
        })
    })
};

export function addMedicationsDB({ name, category, expiration, quantity, freeze, note }) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO medication (name, category, expiration, quantity, freeze, note) VALUES (?, ?, ?, ?, ?, ?)',
                [name, category, expiration, quantity, freeze, note],
                (_, result) => resolve(result.insertId),
                (_, error) => reject(error)
            )
        })
    })
};

export function deleteMedicationsDB(id) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM medication WHERE id = ?',
                [id],
                resolve,
                (_, error) => reject(error)
            )
        })
    })

};

export function updateMedicationsDB(data, id) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE medication SET freeze = ? WHERE id = ?',
                [data, id],
                resolve,
                (_, error) => reject(error)
            )
        })
    })

};