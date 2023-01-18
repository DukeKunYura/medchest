import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header(props) {

    const { navigation } = props;

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.text}>Моя аптечка</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { navigation.navigate('Backup') }}
                style={styles.backup}>
                <MaterialIcons name="cloud-queue" size={24} color="white" />
            </TouchableOpacity>
            {props.children}
        </>

    )
};

const styles = StyleSheet.create({
    header: {
        position: "relative",
        width: "100%",
        height: 100,
        backgroundColor: "#9CCC65",
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 1
    },
    text: {
        color: "#F1F8E9",
        fontSize: 26,
        marginBottom: 10
    },
    backup: {
        position: "absolute",
        marginTop: 65,
        marginLeft: 20,
        zIndex: 2


    }
})
