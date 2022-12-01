import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import Editor from '../components/Editor';
import Header from '../components/Header';

export default function ItemScreen({ route }) {

    const { itemId } = route.params;

    const state = useSelector((state) => state.master);

    const [item, setItem] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const handleSetEditing = () => {
        if (isEditing) { setIsEditing(false) } else { setIsEditing(true) };
    };

    useEffect(() => {
        let [item] = state.medications.filter(item => item.id === itemId);
        setItem(item)
    }, [state.medications]);

    return (
        <KeyboardAvoidingView
            behavior="position">
            <Header />
            {!isEditing && <View style={[styles.container, styles.boxShadow]}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{item.name}</Text>
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>категория:</Text>
                    <View style={styles.data}>
                        <Text style={styles.dataText}>{item.category}</Text>
                    </View>
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>годен до:</Text>
                    <View style={styles.data}>
                        <Text style={styles.dataText}>{item.expiration}</Text>
                    </View>
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>количество:</Text>
                    <View style={styles.data}>
                        <Text style={styles.dataText}>{item.quantity}</Text>
                    </View>
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>хранение:</Text>
                    <View style={styles.data}>
                        <Text style={styles.dataText}>{item.freeze}</Text>
                    </View>
                </View>
                <View style={styles.fieldName}>
                    <Text style={styles.fieldText}>примечание:</Text>
                    <View style={styles.note}>
                        <Text style={styles.dataText}>{item.note}</Text>
                    </View>

                </View>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleSetEditing}>
                        <View>
                            <Text>Изменить</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>}
            {isEditing && <Editor item={item} />}

        </KeyboardAvoidingView>
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
    titleText: {
        fontSize: 20,
        color: "#383838"
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
    data: {
        marginTop: 5,
        marginBottom: 5
    },
    dataText: {
        fontSize: 16
    },
    note: {
        margin: 10,
        marginLeft: -10,
        backgroundColor: "#e8e8e8",
        borderRadius: 10,
        minHeight: 40
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