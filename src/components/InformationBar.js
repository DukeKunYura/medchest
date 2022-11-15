import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function InfoBar() {
    return (
        <View style={styles.info}>
            <TouchableOpacity activeOpacity={0.5} style={styles.category}>
                <Text style={styles.infotext}>Категория</Text>
                <View style={styles.title}>
                    <Feather name="chevrons-down" size={24} color="#fb8ba2" />
                    <Text style={styles.name}>Все препараты</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.sort}>
                <Text style={styles.infotext}>Сотировка</Text>
                <View style={styles.title}>
                    <Feather name="chevrons-down" size={24} color="#fb8ba2" />
                    <Text style={styles.name}>Новые</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.sort}>
                <Text style={styles.infotext}>Срок</Text>
                <View style={styles.title}>
                    <Feather name="chevrons-down" size={24} color="#fb8ba2" />
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
        alignItems: "center"
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