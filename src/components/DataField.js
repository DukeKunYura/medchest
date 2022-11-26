import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DataField(props) {

    const { data, size } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.5}>
            <View style={styles.container}>
                <Text style={{ fontSize: size }}>{data}</Text>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5
    },
    title: {
        alignItems: "flex-start",
        marginLeft: 16,
        width: "60%"
    }
});