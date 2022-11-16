import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


export default function Medication(props) {

    const { item } = props;

    return (
        <View style={[styles.container, styles.boxShadow]}>
            <View style={styles.title}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.expiration}>{item.expiration}</Text>
            </View>
            <Fontisto name="snowflake" size={10} color="#8DCEF6" />
            <View style={styles.quantity}><Text>{item.quantity}</Text></View>
            <View style={styles.buttons}>
                <View style={styles.edit}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={22} color="grey" />
                </View>
                <View style={styles.edit}>
                    <MaterialCommunityIcons name="delete-alert-outline" size={24} color="#fb8ba2" />
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        borderRadius: 6

    },
    title: {
        alignItems: "flex-start",
        marginLeft: 16,
        width: "60%"
    },
    category: {
        color: "grey"
    },
    name: {
        fontSize: 16
    },
    expiration: {
        fontSize: 12,
        color: "grey",
        margin: 3
    },
    quantity: {
        marginRight: 10
    },
    buttons: {
        flexDirection: "row",
        marginRight: 5
    },
    edit: {
        marginRight: 10
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

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 2, '#171717');
