import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function FilterTypeChanger({ setIsActiveFilterChanger }) {

    const filterTypes = [{ title: "Все категории", id: "1" }, { title: "Разное", id: "2" }, { title: "Антибиотики", id: "3" }];

    return (

        <>
            <TouchableOpacity
                style={styles.changerBack}
                onPress={() => { setIsActiveFilterChanger(false) }} />
            <View style={styles.changer}>
                <View style={[styles.window, styles.boxShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>сортировка:</Text>
                    </View>
                    <View style={styles.list}>
                        {filterTypes.map(item =>
                            <TouchableOpacity
                                style={styles.change}
                                key={item.id}
                                activeOpacity={0.5}
                                onPress={() => { setIsActiveFilterChanger(false) }}>
                                <View ><Text style={styles.text}>{item.title}</Text></View>
                            </TouchableOpacity>
                        )}
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
        height: 220,
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

