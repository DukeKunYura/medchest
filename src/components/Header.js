import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InformationBar from './InformationBar';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Моя аптечка</Text>
            <InformationBar />

        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 150,
        backgroundColor: "#9CCC65",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    text: {
        color: "#F1F8E9",
        fontSize: 26,
        marginBottom: 10
    }
})
