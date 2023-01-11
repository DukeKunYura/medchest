import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SpoiledScreen from '../screens/SpoiledScreen';
import ItemScreen from '../screens/ItemScreen';
import BackupScreen from '../screens/BackupScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    component={HomeScreen} />
                <Stack.Screen
                    name="Spoiled"
                    options={{ headerShown: false }}
                    component={SpoiledScreen} />
                <Stack.Screen
                    name="Item"
                    options={{ headerShown: false }}
                    component={ItemScreen} />
                <Stack.Screen
                    name='Backup'
                    options={{ headerShown: false }}
                    component={BackupScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
