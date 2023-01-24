import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editMedication } from '../redux/masterSlice';
import { updateMedicationDB } from '../sqlite/db';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryChangerEditor from './CategoryChangerEditor';
import FreezeChangerEditor from './FreezeChangeEditor';
import NoteEditor from './NoteEditor';

/**
 * Компонент отвечает за редактирование медикамента, валидацию форм при редактировании
 */
export default function Editor({ item, navigation }) {

    const [isColorHighlight, setIsColorHighlight] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(item.category);
    const [selectedFreeze, setSelectedFreeze] = useState(item.freeze);
    const [note, setNote] = useState(item.note)
    const [isActiveChangeCategory, setIsActiveChangeCategory] = useState(false);
    const [isActiveChangeFreeze, setIsActiveChangeFreeze] = useState(false);
    const [isActiveNoteEditor, setIsActiveNoteEditor] = useState(false);

    const dispatch = useDispatch();

    const colorHighlight = (field) => { setIsColorHighlight(field) };

    const handleCategoryChanger = (category) => {
        setSelectedCategory(category);
        setIsActiveChangeCategory(false);
    };

    const handleFreezeChanger = (freeze) => {
        setSelectedFreeze(freeze);
        setIsActiveChangeFreeze(false);
    };

    const handleFocusCategory = () => {
        colorHighlight("category");
        setIsActiveChangeCategory(true);
    };

    const handleFocusFreeze = () => {
        colorHighlight("freeze");
        setIsActiveChangeFreeze(true);
    };

    const handleCancelEdit = () => {
        navigation.goBack();
    };

    const handleEditMedication = (id, values) => {

        let expiration = (values.day.length > 1 ? values.day : "0" + values.day)
            + "." + (values.month.length > 1 ? values.month : "0" + values.month) + "." + values.year;

        const allValues = {
            name: values.name,
            expiration,
            freeze: selectedFreeze,
            category: values.category,
            quantity: values.quantity,
            note
        };
        const data = { id, allValues };
        navigation.goBack();
        dispatch(editMedication(data));
        console.log(allValues);
        updateMedicationDB(allValues);
    };

    const formValidationSchema = Yup.object().shape({
        name: Yup.string().required(),
        quantity: Yup.string().required(),
        day: Yup.number().min(1).max(31).required(),
        month: Yup.number().min(1).max(12).required(),
        year: Yup.number().min(2022).max(2050).required()
    });


    return (
        <View
            style={[styles.container, styles.boxShadow]}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{item.name}</Text>
            </View>
            <Modal
                visible={isActiveChangeCategory}
                animationType="none"
                transparent={true}>
                <CategoryChangerEditor
                    handleCategoryChanger={handleCategoryChanger}
                    setIsActiveChangeCategory={setIsActiveChangeCategory} />
            </Modal>
            <Modal
                visible={isActiveChangeFreeze}
                animationType="none"
                transparent={true}>
                <FreezeChangerEditor
                    handleFreezeChanger={handleFreezeChanger}
                    setIsActiveChangeFreeze={setIsActiveChangeFreeze} />
            </Modal>
            <Modal
                visible={isActiveNoteEditor}
                animationType="none"
                transparent={true}>
                <NoteEditor
                    note={note}
                    setNote={setNote}
                    setIsActiveNoteEditor={setIsActiveNoteEditor} />
            </Modal>
            <Formik
                validationSchema={formValidationSchema}
                initialValues={{
                    name: item.name,
                    category: selectedCategory,
                    quantity: item.quantity,
                    day: item.expiration.substring(0, 2),
                    month: item.expiration.substring(3, 5),
                    year: item.expiration.substring(6, 10),
                    freeze: selectedFreeze
                }}
                onSubmit={(values) => { handleEditMedication(item.id, values) }}>
                {(props) => (
                    <View>
                        <View style={styles.fieldName}>
                            <Text style={styles.fieldText}>название:</Text>
                            <View style={styles.data}>
                                <TextInput
                                    style={isColorHighlight === "name" ? styles.dataNameTextColor : styles.dataNameText}
                                    value={props.values.name}
                                    maxLength={20}
                                    onChangeText={props.handleChange("name")}
                                    onFocus={() => { colorHighlight("name") }}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={styles.fieldName}>
                            <Text style={styles.fieldText}>категория:</Text>
                            <TouchableOpacity
                                style={styles.data}
                                onPressIn={handleFocusCategory}>
                                <TextInput
                                    style={isColorHighlight === "category" ? styles.dataNameTextColor : styles.dataNameText}
                                    value={selectedCategory}
                                    editable={false}
                                ></TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fieldName}>
                            <Text style={styles.fieldText}>годен до:</Text>
                            <View style={styles.data}>
                                <View style={styles.inputDate}>
                                    <TextInput
                                        style={isColorHighlight === "day" ? styles.dataDayTextColor : styles.inputDateText}
                                        value={props.values.day}
                                        placeholder="xx"
                                        keyboardType='numeric'
                                        maxLength={2}
                                        onBlur={props.handleBlur('day')}
                                        textAlign='center'
                                        onChangeText={props.handleChange("day")}
                                        onFocus={() => { colorHighlight("day") }}>
                                    </TextInput>
                                    <Text>.</Text>
                                    <TextInput
                                        style={isColorHighlight === "month" ? styles.dataDayTextColor : styles.inputDateText}
                                        value={props.values.month}
                                        placeholder="xx"
                                        keyboardType='numeric'
                                        maxLength={2}
                                        onBlur={props.handleBlur('month')}
                                        textAlign='center'
                                        onChangeText={props.handleChange("month")}
                                        onFocus={() => { colorHighlight("month") }}>
                                    </TextInput>
                                    <Text>.</Text>
                                    <TextInput
                                        style={isColorHighlight === "year" ? styles.dataQuantityTextColor : styles.inputDateText}
                                        value={props.values.year}
                                        placeholder="xxxx"
                                        keyboardType='numeric'
                                        maxLength={4}
                                        onBlur={props.handleBlur('year')}
                                        textAlign='center'
                                        onChangeText={props.handleChange("year")}
                                        onFocus={() => { colorHighlight("year") }}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.fieldName}>
                            <Text style={styles.fieldText}>количество:</Text>
                            <View style={styles.data}>
                                <TextInput
                                    style={isColorHighlight === "quantity" ? styles.dataQuantityTextColor : styles.dataText}
                                    value={props.values.quantity}
                                    keyboardType='numeric'
                                    maxLength={5}
                                    autoFocus={true}
                                    onChangeText={props.handleChange("quantity")}
                                    onFocus={() => { colorHighlight("quantity") }}
                                    onPressIn={() => { colorHighlight("quantity") }}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={styles.fieldName}>
                            <Text style={styles.fieldText}>хранение:</Text>
                            <TouchableOpacity
                                style={styles.data}
                                onPressIn={handleFocusFreeze}>
                                <TextInput
                                    style={isColorHighlight === "freeze" ? styles.dateFreezeTextColor : styles.dataNameText}
                                    value={selectedFreeze}
                                    editable={false}
                                ></TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fieldName}>
                            <Text style={styles.fieldText}>примечание:</Text>
                            <TouchableOpacity
                                onPress={() => { setIsActiveNoteEditor(true) }}>
                                <ScrollView style={styles.note}>
                                    <Text style={styles.dataText}>{note}</Text>
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsMenu}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={props.handleSubmit}>
                                <View style={
                                    props.errors.name || props.errors.day || props.errors.month || props.errors.year || props.errors.quantity
                                        ? styles.buttonSaveOff : styles.buttonSave}>
                                    <MaterialCommunityIcons name="circle-edit-outline" size={24} color="white" />
                                    <Text style={styles.buttonText}>Сохранить</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleCancelEdit}>
                                <View style={styles.buttonCancel}>
                                    <MaterialCommunityIcons name="cancel" size={25} color="white" />
                                    <Text style={styles.buttonText}>Отмена</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        width: "100%",
        height: 60,
        backgroundColor: "#C5E1A5",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 20
    },
    titleText: {
        fontSize: 20,
        color: "#383838"
    },
    dataNameText: {
        alignItems: "center",
        fontSize: 16,
        color: "#383838"
    },
    container: {
        position: "relative",
        margin: 10,
        borderRadius: 10,
        backgroundColor: "white"
    },
    fieldName: {
        marginLeft: 20
    },
    fieldText: {
        color: "grey"
    },
    data: {
        marginTop: 5,
        marginBottom: 5
    },
    dataText: {
        fontSize: 16
    },
    dataNameTextColor: {
        fontSize: 17,
        backgroundColor: "#C5E1A5",
        width: 140,
        borderRadius: 10,
        alignItems: "center",
        alignContent: "center"
    },
    dataQuantityTextColor: {
        fontSize: 16,
        backgroundColor: "#C5E1A5",
        width: 50,
        borderRadius: 10,
        textAlign: 'center'
    },
    dataDayTextColor: {
        fontSize: 16,
        backgroundColor: "#C5E1A5",
        width: 25,
        borderRadius: 10,
        textAlign: 'center'
    },
    dateFreezeTextColor: {
        fontSize: 17,
        backgroundColor: "#C5E1A5",
        width: 70,
        borderRadius: 10,
        alignItems: "center",
        alignContent: "center"
    },
    inputDate: {
        alignItems: "center",
        flexDirection: "row"
    },
    inputDateText: {
        fontSize: 16
    },
    note: {
        margin: 10,
        marginLeft: -10,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        minHeight: 40,
        maxHeight: 100,
        paddingHorizontal: 5
    },
    buttonsMenu: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginBottom: 10
    },
    buttonSave: {
        flexDirection: "row",
        height: 40,
        width: 120,
        marginRight: 20,
        backgroundColor: "#9CCC65",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSaveOff: {
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
})

const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }
};

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 2, '#171717');
