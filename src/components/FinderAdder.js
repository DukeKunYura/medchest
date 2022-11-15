import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { setSearch, setIsActiveAdderWindow } from '../redux/masterSlice';
import { SimpleLineIcons } from '@expo/vector-icons';


export default function FinderAdder() {

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);


    return (
        <View style={styles.adder}>
            <View style={styles.input}>
                <TextInput
                    value={state.search}
                    onChangeText={(text) => { dispatch(setSearch(text)) }}
                    placeholder="Найти/добавить"
                    cursorColor="grey"
                    textAlign='center'>
                </TextInput>
            </View>
            <TouchableOpacity
                onPress={() => { dispatch(setIsActiveAdderWindow(true)) }}
                activeOpacity={0.5}
            >
                <View style={styles.magnifier}>
                    <SimpleLineIcons name="magnifier-add" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    adder: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "#AED581",
        justifyContent: "space-around",
        alignItems: "center",
        borderColor: "grey",
        borderTopWidth: 1,

    },
    input: {
        height: 40,
        width: "80%",
        backgroundColor: "#F1F8E9",
        borderColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center"
    },
    magnifier: {
        marginEnd: 10
    }
})
