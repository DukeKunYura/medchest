import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

/**
 * Компонент отвечает за отображение и выбор типа сортировки
 */
export default function SortingTypeChanger({ setTypeSorting, setIsActiveSortingChanger }) {

    const sortingTypes = [{ title: "Новые", id: "1" }, { title: "Срок", id: "2" }, { title: "Алфавит", id: "3" }];

    return (

        <>
            <TouchableOpacity
                style={styles.changerBack}
                onPress={() => { setIsActiveSortingChanger(false) }} />
            <View style={styles.changer}>
                <View style={[styles.window, styles.boxShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>сортировка:</Text>
                    </View>
                    <View style={styles.list}>
                        {sortingTypes.map(item =>
                            <TouchableOpacity
                                style={styles.change}
                                key={item.id}
                                activeOpacity={0.5}
                                onPress={() => { setTypeSorting(item.title); setIsActiveSortingChanger(false) }}>
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

