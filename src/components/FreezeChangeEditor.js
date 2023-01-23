import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

/**
 * Компонент отвечает за выбор типа храниения медикамента при редактировании
 */
export default function FreezeChangeEditor({ handleFreezeChanger, setIsActiveChangeFreeze }) {

    const handlerRowChooser = (freeze) => { handleFreezeChanger(freeze) };

    return (
        <>
            <TouchableOpacity
                style={styles.changerBack}
                onPress={() => { setIsActiveChangeFreeze(false) }} />
            <View style={styles.changer}>
                <View style={[styles.window, styles.boxShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>хранение:</Text>
                    </View>
                    <View>
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.change}
                                activeOpacity={0.5}
                                onPress={() => { handlerRowChooser("аптечка") }}>
                                <View ><Text style={styles.text}>аптечка</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.change}
                                activeOpacity={0.5}
                                onPress={() => { handlerRowChooser("холод") }}>
                                <View ><Text style={styles.text}>холод</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>

    );
}


const styles = StyleSheet.create({
    changerBack: {
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
        height: 160,
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
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 18,
        marginBottom: 5
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
    }
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