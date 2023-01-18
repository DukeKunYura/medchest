import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantitySpoiled } from '../redux/masterSlice';
import moment from 'moment';

export default function InformationBar({
    navigation,
    setIsActiveSortingChanger,
    typeSorting,
    setIsActiveFilterChanger,
    typeFilter }) {


    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    useEffect(() => {
        const quantity = state.medications.filter(item =>
            (Number(moment(item.expiration, "DD,MM,YYYY").format("x")) - Number(Date.now().toString())) < 1).length;

        dispatch(setQuantitySpoiled(quantity));

    }, [state.medications]);

    return (
        <View style={styles.info}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.category}
                onPress={() => { setIsActiveFilterChanger(true) }}>
                <Text style={styles.infotext}>Категория</Text>
                <View style={styles.title}>
                    <Text style={styles.name}>{typeFilter}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.sort}
                onPress={() => { setIsActiveSortingChanger(true) }}>
                <Text style={styles.infotext}>Сотировка</Text>
                <View style={styles.title}>
                    <Text style={styles.name}>{typeSorting}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.sort}
                onPress={() => { navigation.navigate('Spoiled') }}>
                <Text style={styles.infotext}>Срок</Text>
                <View style={styles.title}>
                    <Text style={styles.name}>Истек {state.quantitySpoiled}</Text>
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