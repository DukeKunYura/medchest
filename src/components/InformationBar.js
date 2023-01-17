import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function InformationBar({ setIsActiveSortingChanger, typeSorting }) {
    return (
        <View style={styles.info}>
            <TouchableOpacity activeOpacity={0.5} style={styles.category}>
                <Text style={styles.infotext}>Категория</Text>
                <View style={styles.title}>
                    <Text style={styles.name}>Все препараты</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.sort} onPress={() => { setIsActiveSortingChanger(true) }}>
                <Text style={styles.infotext}>Сотировка</Text>
                <View style={styles.title}>
                    <Text style={styles.name}>{typeSorting}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.sort}>
                <Text style={styles.infotext}>Срок</Text>
                <View style={styles.title}>
                    <Text style={styles.name}>Истек 0</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    info: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#C5E1A5",
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: "grey",
        borderBottomWidth: 1,
    },
    category: {
        width: "40%",
        alignItems: "center"
    },
    sort: {
        width: "30%",
        alignItems: "center",
        borderLeftWidth: 1,
        borderColor: "#e1f0d1"
    },
    title: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    infotext: {
        fontSize: 11,
        color: "white"
    },
    name: {
        fontSize: 16
    }
})