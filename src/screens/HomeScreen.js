import React, { useState, useEffect } from 'react';
import { FlatList, Modal, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import AdderWindow from '../components/AdderWindow';
import FinderAdder from '../components/FinderAdder';
import Medication from '../components/Medication';
import InformationBar from '../components/InformationBar';

export default function HomeScreen({ navigation }) {

    const state = useSelector((state) => state.master);

    const [medications, setMedications] = useState(state.medications);

    useEffect(() => {
        if (state.search !== "") {
            let newArr = state.medications.filter(item =>
                item.name.toLowerCase().includes(state.search.toLowerCase()))
            setMedications(newArr);
        } else { setMedications(state.medications) }
    }, [state.search, state.medications]);

    return (
        <View style={styles.home}>
            <Header>
                <InformationBar />
            </Header>
            <View style={styles.page}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={medications}
                    renderItem={({ item }) => (<Medication navigation={navigation} item={item} />)}></FlatList>
            </View>
            <FinderAdder />
            <Modal
                visible={state.isActiveAdderWindow}
                animationType="slide"
                transparent={true}>
                <AdderWindow />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: "white",
    },
    page: {
        flex: 1

    }
})