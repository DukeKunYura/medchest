import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Medication from '../components/Medication';
import Header from '../components/Header';

/**
 * Компонент отвечает за экран со списком просроченных медикаментов
 */
export default function SpoiledScreen({ navigation }) {

    const state = useSelector((state) => state.master);

    const [spoiledMedications, setSpoiledMedications] = useState(state.medications.filter(item =>
        (Number(moment(item.expiration, "DD,MM,YYYY").format("x")) - Number(Date.now().toString())) < 1));

    useEffect(() => {

        setSpoiledMedications(state.medications.filter(item =>
            (Number(moment(item.expiration, "DD,MM,YYYY").format("x")) - Number(Date.now().toString())) < 1))

    }, [state.medications]);

    return (
        <SafeAreaView style={styles.home}>
            <Header navigation={navigation} />
            <View style={styles.title}>
                <Text style={styles.textTitle}>Истек срок годности: {state.quantitySpoiled}</Text>
            </View>
            {spoiledMedications &&
                <View style={styles.page}>
                    <FlatList
                        keyExtractor={(item, index) => { return index.toString() }}
                        data={spoiledMedications}
                        renderItem={({ item }) => (<Medication navigation={navigation} item={item} key={item.key} />)}></FlatList>
                </View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: "#9CCC65"
    },
    page: {
        flex: 1,
        backgroundColor: "white"
    },
    title: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#C5E1A5",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderBottomWidth: 1,
    },
    textTitle: {
        fontSize: 16
    }
})
