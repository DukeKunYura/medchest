import React, { useState, useEffect } from 'react';
import { FlatList, Modal, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setStartCategories, setStartMedications } from '../redux/masterSlice';
import { getMedicationsDB } from '../sqlite/db';
import AdderWindow from '../components/AdderWindow';
import FinderAdder from '../components/FinderAdder';
import Medication from '../components/Medication';
import InformationBar from '../components/InformationBar';
import SortingTypeChanger from '../components/SortingTypeChanger';
import FilterTypeChanger from '../components/FilterTypeChanger';

export default function HomeScreen({ navigation }) {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const [medications, setMedications] = useState(state.medications);
    const [isActiveFilterChanger, setIsActiveFilterChanger] = useState(false);
    const [isActiveSortingChanger, setIsActiveSortingChanger] = useState(false);
    const [typeSorting, setTypeSorting] = useState("Новые");
    const [typeFilter, setTypeFilter] = useState("Все категории");

    const sortingMedicationsList = (array, typeSorting) => {

        if (typeSorting === "Новые") {
            return array.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        } if (typeSorting === "Срок") {
            return array.sort((a, b) =>
                (moment(a.expiration, "DD,MM,YYYY").format("x")) - (moment(b.expiration, "DD,MM,YYYY").format("x")))
        } if (typeSorting === "Алфавит") {
            return array.sort((a, b) => a.name.localeCompare(b.name))
        }

    };

    useEffect(() => {
        if (state.search !== "") {
            let newArr = state.medications.filter(item =>
                item.name.toLowerCase().includes(state.search.toLowerCase()))
            setMedications(newArr);

        } else { setMedications(state.medications) }
    }, [state.search, state.medications]);

    useEffect(() => {

        let newArrSort = state.medications.slice();

        setMedications(sortingMedicationsList(newArrSort, typeSorting));

        console.log("update");

    }, [state.medications, typeSorting]);

    useEffect(() => {
        getMedicationsDB().then(data => dispatch(setStartMedications(data)));
        console.log("get")
        getMedicationsDB().then(data => dispatch(setStartCategories(data)));

    }, []);

    return (
        <View style={styles.home}>
            <Header navigation={navigation}>
                <InformationBar
                    navigation={navigation}
                    setIsActiveSortingChanger={setIsActiveSortingChanger}
                    setIsActiveFilterChanger={setIsActiveFilterChanger}
                    typeSorting={typeSorting}
                    typeFilter={typeFilter} />
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
            <Modal
                visible={isActiveSortingChanger}
                animationType="none"
                transparent={true}>
                <SortingTypeChanger
                    setTypeSorting={setTypeSorting}
                    setIsActiveSortingChanger={setIsActiveSortingChanger} />
            </Modal>
            <Modal
                visible={isActiveFilterChanger}
                animationType="none"
                transparent={true}>
                <FilterTypeChanger
                    setTypeFilter={setTypeFilter}
                    setIsActiveFilterChanger={setIsActiveFilterChanger} />
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