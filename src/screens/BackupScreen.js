import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBackupDataFB } from '../firebase/firebase';
import { addDBKey, getDBKeys } from '../sqlite/dbKeys';

export default function BackupScreen() {

    const state = useSelector((state) => state.master);

    const [listKeys, setListKeys] = useState([])

    const handleAdd = () => {

        const list = state.medications;

        const creatorBackup = createBackupDataFB(list);

        creatorBackup.then(data => addDBKey({ name: "имя", keyId: data.name }));

        creatorBackup.then(data => console.log({ id: data.name, backupData: list }))

    };

    const handleGet = () => {

        getDBKeys().then(data => setListKeys(data));

        getDBKeys().then(data => console.log(data));

    };


    return (
        <View style={styles.container}>
            <Text>BackupScreen</Text>
            <Button
                title='add'
                onPress={handleAdd} />
            <Button
                title='get'
                onPress={handleGet} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    }
})
