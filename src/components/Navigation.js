import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SpoiledScreen from '../screens/SpoiledScreen';
import ItemScreen from '../screens/ItemScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Spoiled"
                    component={SpoiledScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="Item"
                    component={ItemScreen}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
