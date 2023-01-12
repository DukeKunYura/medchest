import * as SQLite from 'expo-sqlite';

const dbKeys = SQLite.openDatabase('keys.db');

export function initDBKeys() {
    return new Promise((resolve, reject) => {
        dbKeys.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS keysList (id INTEGER PRIMARY KEY AUTOINCREMENT, name NOT NULL, keyId TEXT NOT NULL)',
                [],
                resolve,
                (_, error) => reject(error)
            )
        })
    })
};

export function getDBKeys() {
    return new Promise((resolve, reject) => {
        dbKeys.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM keysList',
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => reject(error)
            )
        })
    })
};

export function addDBKey({ name, keyId }) {
    return new Promise((resolve, reject) => {
        dbKeys.transaction(tx => {
            tx.executeSql(
                'INSERT INTO keysList (name, keyId) VALUES (?, ?)',
                [name, keyId],
                (_, result) => resolve(result.insertId),
                (_, error) => reject(error)
            )
        })
    })
};

export function deleteDBKey(id) {
    return new Promise((resolve, reject) => {
        dbKeys.transaction(tx => {
            tx.executeSql(
                'DELETE FROM keysList WHERE id = ?',
                [id],
                resolve,
                (_, error) => reject(error)
            )
        })
    })

};