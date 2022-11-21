import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { useSelector } from 'react-redux';

export default function CategoryChanger({ handleCategoryChanger, selectedCategory }) {

    const state = useSelector((state) => state.master);

    const [isActiveChange, setIsActiveChange] = useState(false);

    const handlerRowChooser = (category) => {

        handleCategoryChanger(category);

        setIsActiveChange(false);
    }

    return (

        <TouchableOpacity
            style={styles.changeBut}
            activeOpacity={0.5}
            onPress={() => { setIsActiveChange(true) }}>
            <Text style={styles.text}>{selectedCategory}</Text>
            <View >
                <Modal
                    visible={isActiveChange}
                    animationType="slide"
                    transparent={true}>
                    <View style={styles.changer}>
                        <View style={[styles.window, styles.boxShadow]}>
                            <ScrollView>
                                <View style={styles.list}>
                                    {state.categories.map(category =>
                                        <TouchableOpacity
                                            style={styles.change}
                                            key={category}
                                            activeOpacity={0.5}
                                            onPress={() => { handlerRowChooser(category) }}>
                                            <View ><Text style={styles.text}>{category}</Text></View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    changer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    window: {
        height: 300,
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

