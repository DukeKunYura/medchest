import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import DataField from '../components/DataField';
import Header from '../components/Header';

export default function ItemScreen({ route }) {

    const { itemId } = route.params;

    const state = useSelector((state) => state.master);

    const [item, setItem] = useState({});

    useEffect(() => {
        let item = state.medications.filter(item => item.id === itemId)[0];
        setItem(item)
    }, [state.medications]);

    return (
        <View>
            <Header />
            <View style={styles.title}>
                <Text style={styles.titleText}>{item.name}</Text>
            </View>
            <View style={[styles.container, styles.boxShadow]}>
                <DataField data={item.name} />
                <DataField data={item.category} />
                <DataField data={item.expiration} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        height: 60,
        backgroundColor: "#C5E1A5",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderBottomWidth: 1,
    },
    titleText: {
        fontSize: 20,
        color: "grey"
    },
    container: {
        margin: 10,
        borderRadius: 10,
        padding: 20
    }
})

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

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 2, '#171717');