import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { setIsActiveAdderWindow, setSearch } from '../redux/masterSlice';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdderWindow() {

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);

    const handlerAdder = (values) => {

        console.log(values);

        dispatch(setIsActiveAdderWindow(false));
        dispatch(setSearch(""));

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
                            <TextInput
                                style={styles.input}
                                value={props.values.category}
                                placeholder="категория"
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
        height: "50%",
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
        borderRadius: 4
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
        borderRadius: 4,
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
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        margin: 5
    }
})