import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Компонент рендерит окно предупреждения с текстом из props
 */
export default function AlertWindow({ text, setIsRepeatAlert }) {
    return (
        <>
            <View style={styles.confirmationBack}></View>
            <View style={styles.changer}>
                <View style={[styles.window, styles.boxShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{text}</Text>
                    </View>
                    <View>
                        <View style={styles.buttonsMenu}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => { setIsRepeatAlert(false) }}>
                                <View style={styles.buttonOk}>
                                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="white" />
                                    <Text style={styles.buttonText}>Ok</Text>
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
        height: 110,
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
        alignItems: "center",
        marginBottom: 10
    },
    headerText: {
        fontSize: 18,
        marginBottom: 5
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
    buttonOk: {
        flexDirection: "row",
        height: 40,
        width: 100,
        backgroundColor: "#9CCC65",
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
