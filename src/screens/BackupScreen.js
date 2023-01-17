import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMedication, setStartMedications } from '../redux/masterSlice';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createBackupDataFB, deleteBackupDataFB, updateBackupDataFB, getBackupDataFB } from '../firebase/firebase';
import { addMedicationDB, deleteAllMedicationDB } from '../sqlite/db';
import { addDBKey, getDBKeys, deleteDBKey } from '../sqlite/dbKeys';

export default function BackupScreen({ navigation }) {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const [listKeys, setListKeys] = useState([]);
    const [isActiveCreateButton, setIsActiveCreateButton] = useState(state.isActiveBackupCreator);

    const handleAddBackup = () => {

        if (listKeys.length > 2) { return };

        const list = state.medications;

        const creatorBackup = createBackupDataFB(list);

        creatorBackup.then(data => addDBKey({ name: "имя", keyId: data.name }));

        navigation.navigate('Home');

    };

    const handleDeleteAllMedications = () => {

        deleteAllMedicationDB();

        dispatch(setStartMedications([]));

        navigation.navigate('Home');

    };

    const handleUpdateBackup = (item) => {

        const list = state.medications;

        updateBackupDataFB(item.keyId, list);

        navigation.navigate('Home');

    };

    const handleLoadBackup = (item) => {

        const getterBackup = getBackupDataFB(item.keyId);

        deleteAllMedicationDB();

        dispatch(setStartMedications([]));

        const insertBackup = (array) => {

            let backup = array[0];

            delete backup.id;

            for (let key in backup) {

                let medication = {
                    name: backup[key].name,
                    category: backup[key].category,
                    expiration: backup[key].expiration,
                    quantity: backup[key].quantity,
                    freeze: backup[key].freeze,
                    note: backup[key].note
                };

                const item = addMedicationDB(medication);

                item.then((data) => { dispatch(addMedication({ ...medication, id: data })) });

            }

            navigation.navigate('Home');
        };

        getterBackup.then(data => insertBackup(data));

    };

    const handleDeleteBackup = (item) => {

        deleteBackupDataFB(item.keyId);

        deleteDBKey(item.id);

        let newArr = listKeys.filter(i => i.id !== item.id);

        setListKeys(newArr);

    };

    const handleGet = () => {

        getDBKeys().then(data => setListKeys(data));

        getDBKeys().then(data => console.log(data));

    };

    useEffect(() => { handleGet() }, []);

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Моя аптечка</Text>
            </View>
            <View style={styles.container}>
                <Text>BackupScreen</Text>
                <Button
                    title='add'
                    onPress={handleAddBackup} />
                <Button
                    title='DELAll'
                    onPress={handleDeleteAllMedications} />
                {listKeys.length !== 0 && listKeys.map(item =>
                    <View key={item.keyId}>
                        <Text>{item.name}</Text>
                        <Text>{item.keyId}</Text>
                        <TouchableOpacity
                            onPress={() => { handleDeleteBackup(item) }}>
                            <View><Text>DEL</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { handleUpdateBackup(item) }}>
                            <View><Text>UPDATE</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { handleLoadBackup(item) }}>
                            <View><Text>LOAD</Text></View>
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
