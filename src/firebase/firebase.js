import sendRequest from "./sendRequest";

export function createBackupDataFB(backupData) {
    return new Promise((resolve, reject) => {
        const newBackup = { "backupData": backupData };
        const data = sendRequest(
            'POST',
            "https://medchest-d692b-default-rtdb.europe-west1.firebasedatabase.app/backups.json",
            newBackup
        );
        resolve(data)
    })
};

export function getBackupDataFB(id) {
    return new Promise((resolve, reject) => {
        const data = sendRequest(
            'GET',
            `https://medchest-d692b-default-rtdb.europe-west1.firebasedatabase.app/backups/${id}.json`
        );
        resolve(data)
    })
};

export function deleteBackupDataFB(id) {
    return new Promise((resolve, reject) => {
        const data = sendRequest(
            'DELETE',
            `https://medchest-d692b-default-rtdb.europe-west1.firebasedatabase.app/backups/${id}.json`
        );
        resolve(data)
    })
};

export function updateBackupDataFB(id, backupData) {
    return new Promise((resolve, reject) => {
        const newBackup = { "backupData": backupData };
        const data = sendRequest(
            'PATCH',
            `https://medchest-d692b-default-rtdb.europe-west1.firebasedatabase.app/backups/${id}.json`,
            newBackup
        );
        resolve(data)
    })
};