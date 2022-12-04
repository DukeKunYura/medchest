import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deleteMedication } from '../redux/masterSlice';
import ConfirmationWindow from '../components/ConfirmationWindow';

export default function Medication(props) {

    const { item, navigation } = props;

    const dispatch = useDispatch();

    const [isActiveConfirmationWindow, setIsActiveConfirmationWindow] = useState(false);

    const handleDeleteMedication = (id) => {
        setIsActiveConfirmationWindow(false);
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
                <Text style={styles.expiration}>{item.expiration}</Text>
            </TouchableOpacity>
            <Fontisto name="snowflake" size={10} color="#8DCEF6" />
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
    expiration: {
        fontSize: 12,
        color: "grey",
        margin: 3
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
