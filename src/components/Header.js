import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Компонент отвечает за рендер хедера на всех экранах
 */
export default function Header(props) {

    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Моя аптечка</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { navigation.navigate('Backup') }}
                style={styles.backup}>
                <MaterialIcons name="cloud-queue" size={24} color="white" />
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    header: {
        position: "relative",
        width: "100%",
        height: 70,
        backgroundColor: "#9CCC65",
        alignItems: "center",
        zIndex: 1
    },
    text: {
        color: "#F1F8E9",
        fontSize: 26,
        marginTop: 20,
    },
    backup: {
        position: "absolute",
        marginLeft: 20,
        marginTop: 28,
        zIndex: 2
    }
})
