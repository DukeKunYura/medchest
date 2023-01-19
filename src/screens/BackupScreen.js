import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMedication, setStartMedications } from '../redux/masterSlice';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { createBackupDataFB, deleteBackupDataFB, updateBackupDataFB, getBackupDataFB } from '../firebase/firebase';
import { addMedicationDB, deleteAllMedicationDB } from '../sqlite/db';
import { addDBKey, getDBKeys, deleteDBKey } from '../sqlite/dbKeys';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConfirmationWindow from '../components/ConfirmationWindow';
import ConfirmationClearWindow from '../components/ConfirmationClearWindow';
import BackupAdderWindow from '../components/BackupAdderWindow';

export default function BackupScreen({ navigation }) {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const [listKeys, setListKeys] = useState([]);
    const [backupItem, setBackupItem] = useState({});
    const [isActiveBackupAdderWindow, setIsActiveBackupAdderWindow] = useState(false);
    const [isActiveInputKeyWindow, setIsActiveInputKeyWindow] = useState(false);
    const [isActiveConfirmClearWindow, setIsActiveConfirmClearWindow] = useState(false);
    const [isActiveConfirmUpdateBackupWindow, setIsActiveConfirmUpdateBackupWindow] = useState(false);
    const [isActiveConfirmLoadBackupWindow, setIsActiveConfirmLoadBackupWindow] = useState(false);
    const [isActiveConfirmDeleteBackupWindow, setIsActiveConfirmDeleteBackupWindow] = useState(false);


    const handlePressAddBackup = () => {

        if (listKeys.length > 2) { return };

        setIsActiveBackupAdderWindow(true);

    };

    const handleAddBackup = (name) => {

        if (listKeys.length > 2) { return };

        const list = state.medications;

        const creatorBackup = createBackupDataFB(list);

        creatorBackup.then(data => addDBKey({ name, keyId: data.name }));

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

    const handleLoadBackupWithKey = (key) => {

        console.log(key)

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
            <Modal
                visible={isActiveBackupAdderWindow}
                animationType="none"
                transparent={true}>
                <BackupAdderWindow
                    handleExecutor={handleAddBackup}
                    setIsActive={setIsActiveBackupAdderWindow} />
            </Modal>
            <Modal
                visible={isActiveConfirmClearWindow}
                animationType="none"
                transparent={true}>
                <ConfirmationClearWindow
                    text={"Удалить все медикаменты"}
                    handleExecutor={handleDeleteAllMedications}
                    setIsActive={setIsActiveConfirmClearWindow} />
            </Modal>
            <Modal
                visible={isActiveConfirmUpdateBackupWindow}
                animationType="none"
                transparent={true}>
                <ConfirmationWindow
                    text={"Перезаписать backup: "}
                    handleExecutor={handleUpdateBackup}
                    item={backupItem}
                    setIsActive={setIsActiveConfirmUpdateBackupWindow} />
            </Modal>
            <Modal
                visible={isActiveConfirmLoadBackupWindow}
                animationType="none"
                transparent={true}>
                <ConfirmationWindow
                    text={"Загрузить backup: "}
                    handleExecutor={handleLoadBackup}
                    item={backupItem}
                    setIsActive={setIsActiveConfirmLoadBackupWindow} />
            </Modal>
            <Modal
                visible={isActiveConfirmDeleteBackupWindow}
                animationType="none"
                transparent={true}>
                <ConfirmationWindow
                    text={"Удалить backup: "}
                    handleExecutor={handleDeleteBackup}
                    item={backupItem}
                    setIsActive={setIsActiveConfirmDeleteBackupWindow} />
            </Modal>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Моя аптечка</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Резервное копирование</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handlePressAddBackup}>
                        <View style={listKeys.length > 2 ? styles.buttonAddBackupOff : styles.buttonAddBackup}>
                            <Ionicons name="md-cloud-done-outline" size={24} color="white" />
                            <Text style={styles.buttonText}>Сделать backup</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleLoadBackupWithKey}>
                        <View style={styles.buttonLoadBackup}>
                            <Ionicons name="md-cloud-download-outline" size={24} color="white" />
                            <Text style={styles.buttonText}>Загрузить backup</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => { setIsActiveConfirmClearWindow(true) }}>
                        <View style={styles.buttonLoadBackup}>
                            <MaterialCommunityIcons name="delete-alert-outline" size={22} color="#fb8ba2" />
                            <Text style={styles.buttonText}>Очистить приложение</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerSaves}>
                    <View><Text style={styles.textTitle}>Контрольные точки</Text></View>
                    {listKeys.length !== 0 && listKeys.map(item =>
                        <View key={item.keyId}>
                            <View style={[styles.containerList, styles.boxShadow]} >
                                <View style={styles.titleList}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.key}>{item.keyId}</Text>
                                </View>
                                <View style={styles.list}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => { setBackupItem(item); setIsActiveConfirmUpdateBackupWindow(true) }}>
                                        <View style={styles.edit}>
                                            <Text>ПЕРЕЗАПИСАТЬ</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => { setBackupItem(item); setIsActiveConfirmLoadBackupWindow(true) }}>
                                        <View style={styles.edit}>
                                            <Text>ЗАГРУЗИТЬ</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => { setBackupItem(item); setIsActiveConfirmDeleteBackupWindow(true) }}>
                                        <View style={styles.edit}>
                                            <Text>УДАЛИТЬ</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    )}
                </View>
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
    textTitle: {
        fontSize: 18,
    },
    buttonAddBackup: {
        flexDirection: "row",
        height: 40,
        width: 230,
        backgroundColor: "#AED581",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        alignItems: "center"
    },
    buttonAddBackupOff: {
        flexDirection: "row",
        height: 40,
        width: 230,
        backgroundColor: "#e0e0e0",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        alignItems: "center"
    },
    buttonLoadBackup: {
        flexDirection: "row",
        height: 40,
        width: 230,
        backgroundColor: "#AED581",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        alignItems: "center"
    },
    containerSaves: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center"

    },
    containerList: {
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        borderRadius: 6
    },
    titleList: {
        alignItems: "flex-start",
        marginLeft: 16,
        width: "60%"
    },
    name: {
        fontSize: 16
    },
    key: {
        color: "grey"
    },
    list: {
        flexDirection: "row",
        marginRight: 5
    },
    edit: {
        marginRight: 10
    }
})

const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }
};

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 2, '#171717');