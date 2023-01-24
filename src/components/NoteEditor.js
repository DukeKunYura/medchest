import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Компонент рендерит окно с инпутом для ввода заметки
 */
export default function NoteEditor(props) {

    const { note, setNote, setIsActiveNoteEditor } = props;

    const [noteValue, setNoteValue] = useState(note);

    return (
        <>
            <TouchableOpacity
                style={styles.confirmationBack}
                onPress={() => { setIsActiveNoteEditor(false) }} />
            <View style={styles.changer}>
                <View style={[styles.window, styles.boxShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Редактировать</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical={"top"}
                            style={styles.input}
                            onChangeText={setNoteValue}
                            value={noteValue}
                            maxLength={200}
                            placeholder={note} />
                    </View>
                    <View>
                        <View style={styles.buttonsMenu}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => { setNote(noteValue); setIsActiveNoteEditor(false) }}>
                                <View style={styles.buttonAdd}>
                                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="white" />
                                    <Text style={styles.buttonText}>Да</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => { setIsActiveNoteEditor(false) }}>
                                <View style={styles.buttonCancel}>
                                    <MaterialCommunityIcons name="cancel" size={25} color="white" />
                                    <Text style={styles.buttonText}>Нет</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    confirmationBack: {
        flex: 1,
        backgroundColor: "black",
        opacity: .4
    },
    changer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%"
    },
    window: {
        height: 240,
        width: "80%",
        backgroundColor: "#d5edb9",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        marginTop: 200,
        marginBottom: 200,
        paddingTop: 10,
        paddingBottom: 10
    },
    header: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    headerText: {
        fontSize: 18,
        margin: 5
    },
    input: {
        height: 120,
        backgroundColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10,
        width: "90%",
        borderColor: "grey",
        padding: 10,
        alignItems: "center",
        fontSize: 16
    },
    list: {
        justifyContent: "center",
        alignItems: "center"
    },
    changeBut: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: "70%",
        backgroundColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        alignItems: "center"
    },
    change: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: "80%",
        margin: 5,
        backgroundColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
        alignItems: "center"
    },
    text: {
        fontSize: 16
    },
    buttonsMenu: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginBottom: 10
    },
    buttonAdd: {
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
});

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

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
