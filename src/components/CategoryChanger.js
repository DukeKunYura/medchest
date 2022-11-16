import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

export default function CategoryChanger() {

    //const dispatch = useDispatch();

    const state = useSelector((state) => state.master);

    const [isActiveChange, setIsActiveChange] = useState(false)

    const handleCategoryChanger = (id) => {
        console.log(id);
        setIsActiveChange(false)

    };

    return (

        <TouchableOpacity
            style={styles.change}
            activeOpacity={0.5}
            onPress={() => { setIsActiveChange(true) }}>
            <Text>Разное</Text>
            <View >
                <Modal
                    visible={isActiveChange}
                    animationType="slide"
                    transparent={true}>
                    {state.categories.map(category =>
                        <TouchableOpacity
                            key={category.id}
                            activeOpacity={0.5}
                            onPress={() => { handleCategoryChanger(category.id) }}>
                            <View style={styles.change}><Text>{category.name}</Text></View>
                        </TouchableOpacity>
                    )}
                </Modal>
            </View>
        </TouchableOpacity>



    );
}

const styles = StyleSheet.create({
    change: {
        height: 40,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "#F1F8E9",
        borderWidth: 1,
        borderRadius: 10
    }
})