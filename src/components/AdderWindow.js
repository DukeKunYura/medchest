import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { setIsActiveAdderWindow, setSearch, addCategory } from '../redux/masterSlice';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryChanger from './CategoryChanger';

export default function AdderWindow() {

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);

    const [selectedCategory, setSelectedCategory] = useState("Разное");

    const handleCategoryChanger = (category) => {

        setSelectedCategory(category);
    };

    const handlerAdder = (values) => {

        dispatch(setIsActiveAdderWindow(false));
        dispatch(setSearch(""));

        let medication = values;

        if (medication.category === "") { medication.category = selectedCategory }
        else { dispatch(addCategory(medication.category)) };

        console.log(medication)

    };

    const handleCancelAdd = () => {

        dispatch(setIsActiveAdderWindow(false));
        dispatch(setSearch(""));

    };

    return (
        <View style={styles.adder}>
            <View style={styles.window}>
                <Formik
                    initialValues={{ name: state.search, category: "", expiration: "" }}
                    onSubmit={(values) => { handlerAdder(values) }}>
                    {(props) => (
                        <View style={styles.inputMenu}>
                            <Text>название</Text>
                            <TextInput
                                style={styles.input}
                                value={props.values.name}
                                placeholder="название"
                                textAlign='center'
                                onChangeText={props.handleChange("name")}>
                            </TextInput>

                            <Text>категория</Text>
                            {props.values.category === "" &&
                                <CategoryChanger
                                    handleCategoryChanger={handleCategoryChanger}
                                    selectedCategory={selectedCategory} />}
                            {props.values.category !== "" &&
                                <View style={styles.plug}>
                                    <Text style={styles.plugText}>------</Text>
                                </View>}
                            <TextInput
                                style={styles.input}
                                value={props.values.category}
                                placeholder="новая"
                                textAlign='center'
                                onChangeText={props.handleChange("category")}>
                            </TextInput>
                            <Text>годен до</Text>
                            <TextInput
                                style={styles.input}
                                value={props.values.expiration}
                                placeholder="дата"
                                textAlign='center'
                                onChangeText={props.handleChange("expiration")}>
                            </TextInput>
                            <View style={styles.buttonsMenu}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={props.handleSubmit}>
                                    <View style={styles.buttonAdd}>
                                        <MaterialIcons name="add-task" size={25} color="white" />
                                        <Text style={styles.buttonText}>Добавить</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={handleCancelAdd}>
                                    <View style={styles.buttonCancel}>
                                        <MaterialCommunityIcons name="cancel" size={25} color="white" />
                                        <Text style={styles.buttonText}>Назад</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    adder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",

    },
    window: {
        height: 340,
        width: "100%",
        backgroundColor: "#F1F8E9",
        justifyContent: "space-between",
        borderColor: "grey",
        borderTopWidth: 1,

    },
    inputMenu: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"

    },
    input: {
        height: 40,
        width: "80%",
        backgroundColor: "white",
        borderColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10
    },
    buttonsMenu: {
        flexDirection: "row",
        width: 300,
        justifyContent: "center"
    },
    buttonAdd: {
        flexDirection: "row",
        height: 40,
        width: 120,
        marginRight: 20,
        backgroundColor: "#AED581",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCancel: {
        flexDirection: "row",
        height: 40,
        width: 100,
        backgroundColor: "#fb8ba2",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        margin: 5
    },
    plug: {
        height: 40,
        width: "80%",
        backgroundColor: "white",
        borderColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    plugText: {
        color: "#c2c2c2"
    }
})