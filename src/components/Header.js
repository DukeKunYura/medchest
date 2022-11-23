import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header(props) {
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.text}>Моя аптечка</Text>
            </View>
            {props.children}
        </>

    )
};

const styles = StyleSheet.create({
    header: {
        height: 100,
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
