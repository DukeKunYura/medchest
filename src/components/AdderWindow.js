import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Modal } from 'react-native';
import { setIsActiveAdderWindow, setSearch, addCategory, addMedication } from '../redux/masterSlice';
import { addMedicationDB } from '../sqlite/db';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import CategoryChanger from './CategoryChanger';
import AlertWindow from './AlertWindow';

export default function AdderWindow() {

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);

    const [selectedCategory, setSelectedCategory] = useState("Разное");
    const [isRepeatAlert, setIsRepeatAlert] = useState(false);
    const [isFreezeMedication, setIsFreezeMedication] = useState("аптечка");

    const handleCategoryChanger = (category) => { setSelectedCategory(category) };

    const handleAdder = (values) => {

        if (state.medications.find(item => item.name === values.name)) { setIsRepeatAlert(true); return };

        dispatch(setIsActiveAdderWindow(false));
        dispatch(setSearch(""));

        let expiration = (values.day.length > 1 ? values.day : "0" + values.day)
            + "." + (values.month.length > 1 ? values.month : "0" + values.month) + "." + values.year;

        let medication = {
            //id: Date.now().toString(),
            name: values.name,
            category: selectedCategory,
            expiration: expiration,
            quantity: "~",
            freeze: isFreezeMedication,
            note: ""
        };

        if (values.category !== "") { medication.category = values.category };

        const item = addMedicationDB(medication);

        console.log(medication);

        item.then((data) => { dispatch(addMedication({ ...medication, id: data })) });

        if (!state.categories.includes(medication.category)) { dispatch(addCategory(medication.category)) }


    };

    const handleSetFreeze = () => {
        if (isFreezeMedication === "холод") { setIsFreezeMedication("аптечка") }
        else { setIsFreezeMedication("холод") }
    };

    const handleCancelAdd = () => {
        dispatch(setIsActiveAdderWindow(false));
        dispatch(setSearch(""));
    };

    const formValidationSchema = Yup.object().shape({
        name: Yup.string().required(),
        day: Yup.number().min(1).max(31).required(),
        month: Yup.number().min(1).max(12).required(),
        year: Yup.number().min(2022).max(2050).required()
    });

    return (
        <View style={styles.adder}>
            <Modal
                visible={isRepeatAlert}
                animationType="none"
                transparent={true}>
                <AlertWindow
                    text={"Препарат есть в списке!"}
                    setIsRepeatAlert={setIsRepeatAlert} />
            </Modal>
            <View style={styles.window}>
                <Formik
                    validationSchema={formValidationSchema}
                    initialValues={{ name: state.search, category: "", day: "", month: "", year: "" }}
                    onSubmit={(values) => { handleAdder(values) }}>
                    {(props) => (
                        <View style={styles.inputMenu}>
                            <Text style={styles.adderTitleText}>Добавить</Text>
                            <TextInput
                                style={styles.input}
                                value={props.values.name}
                                placeholder="название"
                                maxLength={20}
                                textAlign='center'
                                onChangeText={props.handleChange("name")}>
                            </TextInput>
                            <TouchableOpacity
                                style={styles.categoryTitle}
                                activeOpacity={0.5}
                                onPress={handleSetFreeze}>
                                <Text style={styles.categoryTitleText}>категория</Text>
                                <Fontisto name="snowflake" size={18}
                                    color={isFreezeMedication === "холод" ? "#8DCEF6" : "#c2c2c2"} />
                            </TouchableOpacity>
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
                                maxLength={16}
                                autoCapitalize="none"
                                textAlign='center'
                                onChangeText={props.handleChange("category")}>
                            </TextInput>
                            <Text style={styles.inputDateText}>годен до</Text>
                            <View style={styles.inputDate}>
                                <TextInput
                                    style={styles.inputDateText}
                                    value={props.values.day}
                                    placeholder="xx"
                                    keyboardType='numeric'
                                    maxLength={2}
                                    onBlur={props.handleBlur('day')}
                                    textAlign='center'
                                    onChangeText={props.handleChange("day")}>
                                </TextInput>
                                <Text>.</Text>
                                <TextInput
                                    style={styles.inputDateText}
                                    value={props.values.month}
                                    placeholder="xx"
                                    keyboardType='numeric'
                                    maxLength={2}
                                    onBlur={props.handleBlur('month')}
                                    textAlign='center'
                                    onChangeText={props.handleChange("month")}>
                                </TextInput>
                                <Text>.</Text>
                                <TextInput
                                    style={styles.inputDateText}
                                    value={props.values.year}
                                    placeholder="xxxx"
                                    keyboardType='numeric'
                                    maxLength={4}
                                    onBlur={props.handleBlur('year')}
                                    textAlign='center'
                                    onChangeText={props.handleChange("year")}>
                                </TextInput>
                            </View>
                            <View style={styles.buttonsMenu}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={props.handleSubmit}>
                                    <View style={props.errors.name || props.errors.day || props.errors.month || props.errors.year
                                        ? styles.buttonAddOff : styles.buttonAdd}>
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
        backgroundColor: "#d5edb9",
        justifyContent: "space-between",
        borderColor: "grey",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    inputMenu: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    adderTitleText: {
        marginTop: 10,
        fontSize: 18
    },
    input: {
        height: 40,
        backgroundColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10,
        width: "70%",
        borderColor: "grey",
        alignItems: "center",
        fontSize: 16
    },
    categoryTitle: {
        flexDirection: "row",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    categoryTitleText: {
        marginRight: 10,
        fontSize: 16
    },
    inputDate: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 40,
        backgroundColor: "#F1F8E9",
        borderRadius: 10,
        width: "70%",
        borderColor: "grey",
        borderWidth: 1
    },
    inputDateText: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 16
    },
    buttonsMenu: {
        flexDirection: "row",
        width: 300,
        justifyContent: "center"
    },
    buttonAddOff: {
        flexDirection: "row",
        height: 40,
        width: 120,
        marginRight: 20,
        backgroundColor: "#e0e0e0",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
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
        width: "70%",
        backgroundColor: "#F1F8E9",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    plugText: {
        color: "#c2c2c2",
        fontSize: 16
    }
})