import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { useSelector } from 'react-redux';

/**
 * Компонент отвечает за выбор категории при добавлении медикамента
 */
export default function CategoryChanger({ handleCategoryChanger, selectedCategory }) {

    const state = useSelector((state) => state.master);

    const [isActiveChange, setIsActiveChange] = useState(false);

    const handlerRowChooser = (category) => {

        handleCategoryChanger(category);

        setIsActiveChange(false);
    };

    return (

        <TouchableOpacity
            style={styles.changeBut}
            activeOpacity={0.5}
            onPress={() => { setIsActiveChange(true) }}>
            <Text style={styles.text}>{selectedCategory}</Text>
            <View >
                <Modal
                    visible={isActiveChange}
                    animationType="fade"
                    transparent={true}>
                    <TouchableOpacity
                        style={styles.changerBack}
                        onPress={() => { setIsActiveChange(false) }} />
                    <View style={styles.changer}>
                        <View style={[styles.window, styles.boxShadow]}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>категории:</Text>
                            </View>
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

