import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Main from './src/components/Main';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { bootstrap } from './src/bootstrap';

export default function App() {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await bootstrap();
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) { await SplashScreen.hideAsync(); }
    }, [isReady]);

    if (!isReady) {
        return <View style={styles.container}><Image style={styles.img} source={require('./src/img/splashMedChest.png')} /></View>;
    }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

// подключенные зависимости
// $ npm i react-redux @reduxjs/toolkit
// $ npm i --save-dev @types/react-redux


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AED581",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: "100%",
        height: "100%"
    }
})