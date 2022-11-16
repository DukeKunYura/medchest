import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { setSearch, setIsActiveAdderWindow } from '../redux/masterSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function FinderAdder() {

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);


    return (
        <View style={styles.adder}>
            <View style={styles.inputField}>
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
                    activeOpacity={0.5}>
                    <View style={styles.magnifier}>

                        <View>
                            <MaterialCommunityIcons name="flask-empty-plus-outline" size={24} color="white" />
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    adder: {
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderTopWidth: 1,
    },
    inputField: {
        flexDirection: "row",
        height: 40,
        width: "70%",
        backgroundColor: "#F1F8E9",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        marginLeft: 10,
        width: "70%",
        alignItems: "center",
        justifyContent: "center"
    },
    magnifier: {
        height: 34,
        width: 46,
        marginLeft: 20,
        backgroundColor: "#AED581",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        marginRight: 3
    }
})
