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
            <View style={[styles.container, styles.boxShadow]}>
                <View style={styles.title}>
                    <DataField data={item.name} size={20} />
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>категория:</Text>
                    <DataField data={item.category} size={16} />
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>годен до:</Text>
                    <DataField data={item.expiration} size={16} />
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>количество:</Text>
                    <DataField data={item.quantity} size={16} />
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>хранение:</Text>
                    <DataField data={item.freeze} size={16} />
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>примечание:</Text>
                    <View style={styles.note}>
                        <DataField data={item.note} size={16} />
                    </View>

                </View>

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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 20
    },
    container: {
        margin: 10,
        borderRadius: 10,
        borderColor: "white",
        padding: 2
    },
    fieldName: {
        marginLeft: 20
    },
    fieldText: {
        color: "grey"
    },
    note: {
        margin: 10,
        marginLeft: -10,
        backgroundColor: "#e8e8e8",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        minHeight: 80
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