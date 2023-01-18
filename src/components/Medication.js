import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deleteMedication } from '../redux/masterSlice';
import { deleteMedicationDB } from '../sqlite/db';
import moment from 'moment';
import localization from 'moment/locale/ru';
import ConfirmationWindow from '../components/ConfirmationWindow';

export default function Medication(props) {

    const { item, navigation } = props;

    moment().locale("ru", localization).format('LLL');

    const dispatch = useDispatch();

    const [isActiveConfirmationWindow, setIsActiveConfirmationWindow] = useState(false);

    const endDate = moment(item.expiration, "DD,MM,YYYY").fromNow();

    let now = Date.now().toString();

    let endDateMs = moment(item.expiration, "DD,MM,YYYY").format("x");

    let remainingPeriodMs = Number(endDateMs) - Number(now);

    let remainingPeriod = "long";

    if (remainingPeriodMs < 1) { remainingPeriod = "passed" }
    else if (remainingPeriodMs < 607172262) { remainingPeriod = "week" }
    else if (remainingPeriodMs < 2928359954) { remainingPeriod = "month" }


    const handleDeleteMedication = (id) => {
        setIsActiveConfirmationWindow(false);
        deleteMedicationDB(id);
        dispatch(deleteMedication(id));
    };


    return (
        <View style={[styles.container, styles.boxShadow]}>
            <Modal
                visible={isActiveConfirmationWindow}
                animationType="none"
                transparent={true}>
                <ConfirmationWindow
                    text={"Удалить: "}
                    handleDeleteMedication={handleDeleteMedication}
                    setIsActiveConfirmationWindow={setIsActiveConfirmationWindow}
                    id={item.id}
                    name={item.name} />
            </Modal>
            <TouchableOpacity
                style={styles.title}
                activeOpacity={0.5}
                onPress={() => { navigation.navigate('Item', { itemId: item.id, editing: false }) }}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.name}>{item.name}</Text>
                {remainingPeriod === "passed" && <Text style={styles.expirationPassed}>{endDate}</Text>}
                {remainingPeriod === "month" && <Text style={styles.expirationMonth}>{endDate}</Text>}
                {remainingPeriod === "week" && <Text style={styles.expirationWeek}>{endDate}</Text>}
                {remainingPeriod !== "passed" && remainingPeriod !== "month" && remainingPeriod !== "week" &&
                    <Text style={styles.expirationLong}>{endDate}</Text>}
            </TouchableOpacity>
            <View style={styles.snowflake}>
                {item.freeze === "холод" && <Fontisto name="snowflake" size={10} color="#8DCEF6" />}
            </View>
            <View style={styles.quantity}><Text>{item.quantity}</Text></View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { navigation.navigate('Item', { itemId: item.id, editing: true }) }}>
                    <View style={styles.edit}>
                        <MaterialCommunityIcons name="file-document-edit-outline" size={22} color="grey" />
                    </View>
                </TouchableOpacity>

                <View style={styles.edit}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => { setIsActiveConfirmationWindow(true) }}>
                        <MaterialCommunityIcons name="delete-alert-outline" size={24} color="#fb8ba2" />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        borderRadius: 6
    },
    title: {
        alignItems: "flex-start",
        marginLeft: 16,
        width: "60%"
    },
    category: {
        color: "grey"
    },
    name: {
        fontSize: 16
    },
    expirationLong: {
        fontSize: 12,
        color: "#AED581",
        margin: 3
    },
    expirationMonth: {
        fontSize: 12,
        color: "orange",
        margin: 3
    },
    expirationWeek: {
        fontSize: 12,
        color: "#ff738f",
        margin: 3
    },
    expirationPassed: {
        fontSize: 12,
        color: "#a11d37",
        margin: 3
    },
    snowflake: {
        marginRight: "auto",
        marginLeft: 5
    },
    quantity: {
        marginRight: 10
    },
    buttons: {
        flexDirection: "row",
        marginRight: 5
    },
    edit: {
        marginRight: 10
    }
});

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
