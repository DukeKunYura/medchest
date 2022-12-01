import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import CategoryChangerEditor from './CategoryChangerEditor';
import FreezeChangerEditor from './FreezeChangeEditor';

export default function Editor({ item }) {

    const handleEditMedication = () => { };

    const [isColorHighlight, setIsColorHighlight] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(item.category);
    const [selectedFreeze, setSelectedFreeze] = useState(item.freeze);
    const [isActiveChangeCategory, setIsActiveChangeCategory] = useState(false);
    const [isActiveChangeFreeze, setIsActiveChangeFreeze] = useState(false);

    const formValidationSchema = Yup.object().shape({ quantity: Yup.number().required() });

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


    return (
        <View style={[styles.container, styles.boxShadow]}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{item.name}</Text>
            </View>
            <Modal
                visible={isActiveChangeCategory}
                animationType="fade"
                transparent={true}>
                <CategoryChangerEditor handleCategoryChanger={handleCategoryChanger} />
            </Modal>
            <Modal
                visible={isActiveChangeFreeze}
                animationType="fade"
                transparent={true}>
                <FreezeChangerEditor handleFreezeChanger={handleFreezeChanger} />
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
                onSubmit={(values) => { handleEditMedication(values) }}>
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
                                    maxLength={4}
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
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical={"top"}
                                style={styles.note}>
                                <Text style={styles.dataText}>{item.note}</Text>
                            </TextInput>
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
        margin: 10,
        borderRadius: 10,
        borderColor: "white",
        padding: 2
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
        width: 40,
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
        backgroundColor: "#e8e8e8",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        minHeight: 80
    }
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
