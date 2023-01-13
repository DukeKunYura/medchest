import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createBackupDataFB, deleteBackupDataFB } from '../firebase/firebase';
import { addDBKey, getDBKeys, deleteDBKey } from '../sqlite/dbKeys';

export default function BackupScreen() {

    const state = useSelector((state) => state.master);

    const [listKeys, setListKeys] = useState([]);
    const [isActiveCreateButton, setIsActiveCreateButton] = useState(state.isActiveBackupCreator);

    const handleAdd = () => {

        const list = state.medications;

        const creatorBackup = createBackupDataFB(list);

        creatorBackup.then(data => addDBKey({ name: "имя", keyId: data.name }));

        //creatorBackup.then(data => console.log({ id: data.name, backupData: list }));

    };

    const handleDeleteBackup = (item) => {

        deleteBackupDataFB(item.keyId);

        deleteDBKey(item.id);

        newArr = listKeys.filter(i => i.id !== item.id);

        setListKeys(newArr);

    };

    const handleGet = () => {

        getDBKeys().then(data => setListKeys(data));

        getDBKeys().then(data => console.log(data));

    };

    useEffect(() => {
        handleGet();

    }, []);


    return (
        <>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Моя аптечка</Text>
            </View>
            <View style={styles.container}>
                <Text>BackupScreen</Text>
                <Button
                    title='add'
                    onPress={handleAdd} />
                {listKeys.length !== 0 && listKeys.map(item =>
                    <View key={item.keyId}>
                        <Text>{item.name}</Text>
                        <Text>{item.keyId}</Text>
                        <TouchableOpacity
                            onPress={() => { handleDeleteBackup(item) }}>
                            <View><Text>DEL</Text></View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    header: {
        position: "relative",
        width: "100%",
        height: 100,
        backgroundColor: "#9CCC65",
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 1
    },
    textHeader: {
        color: "#F1F8E9",
        fontSize: 26,
        marginBottom: 10
    },
})
