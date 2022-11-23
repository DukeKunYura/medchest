import React from 'react';
import { View, Text } from 'react-native';

export default function DataField(props) {

    const { data } = props;

    return (
        <View><Text>{data}</Text></View>
    );
}
