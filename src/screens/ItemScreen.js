import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

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
            <Text>
                ItemScreen
                {itemId}
            </Text>
            <Text>{item.name}</Text>
            <Text>{item.category}</Text>
            <Text>{item.expiration}</Text>
        </View>
    );
}
