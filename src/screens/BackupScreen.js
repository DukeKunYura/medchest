import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBackupDataFB } from '../firebase/firebase';

export default function BackupScreen() {

    const handleAdd = () => {

        const list = { "one": "one item ", "two": "two item" };

        const creatorBackup = createBackupDataFB(list);

        creatorBackup.then(data => console.log({ id: data.name, backupData: list }))
            .catch(error => console.log(error))



    };


    return (
        <View style={styles.container}>
            <Text>BackupScreen</Text>
            <Button
                title='add'
                onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
