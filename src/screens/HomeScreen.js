import React, { useState, useEffect } from 'react';
import { FlatList, Modal, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { setStartMedications } from '../redux/masterSlice'
import { getMedicationsDB } from '../sqlite/db';
import AdderWindow from '../components/AdderWindow';
import FinderAdder from '../components/FinderAdder';
import Medication from '../components/Medication';
import InformationBar from '../components/InformationBar';

export default function HomeScreen({ navigation }) {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const [medications, setMedications] = useState(state.medications);

    useEffect(() => {
        if (state.search !== "") {
            let newArr = state.medications.filter(item =>
                item.name.toLowerCase().includes(state.search.toLowerCase()))
            setMedications(newArr);
        } else { setMedications(state.medications) }
    }, [state.search, state.medications]);

    useEffect(() => {
        setMedications(state.medications);
        console.log("update");
    }, [state.medications]);

    useEffect(() => {
        getMedicationsDB().then(data => dispatch(setStartMedications(data)));
        console.log("get")

    }, []);

    return (
        <View style={styles.home}>
            <Header>
                <InformationBar />
            </Header>
            {medications &&
                <View style={styles.page}>
                    <FlatList
                        keyExtractor={(item, index) => { return index.toString() }}
                        data={medications}
                        renderItem={({ item }) => (<Medication navigation={navigation} item={item} key={item.key} />)}></FlatList>
                </View>}
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