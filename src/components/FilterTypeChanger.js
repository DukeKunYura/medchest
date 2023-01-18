import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid'

export default function FilterTypeChanger({ setIsActiveFilterChanger, setTypeFilter }) {

    const state = useSelector((state) => state.master);

    const filterTypes = state.categories

    return (

        <>
            <TouchableOpacity
                style={styles.changerBack}
                onPress={() => { setIsActiveFilterChanger(false) }} />
            <View style={styles.changer}>
                <View style={[styles.window, styles.boxShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>категории:</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.change}
                                activeOpacity={0.5}
                                onPress={() => { setTypeFilter("Все категории"); setIsActiveFilterChanger(false) }}>
                                <View ><Text style={styles.text}>Все категории</Text></View>
                            </TouchableOpacity>
                            {filterTypes.map(item =>
                                <TouchableOpacity
                                    style={styles.change}
                                    key={nanoid(5)}
                                    activeOpacity={0.5}
                                    onPress={() => { setTypeFilter(item); setIsActiveFilterChanger(false) }}>
                                    <View ><Text style={styles.text}>{item}</Text></View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
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

