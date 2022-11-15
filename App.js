import React from 'react';
import Main from './src/components/Main';
import Header from './src/components/Header';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {

    return (

        <Provider store={store}>
            <Header />
            <Main />
        </Provider>


    );
}
// подключенные зависимости
// $ npm i react-redux @reduxjs/toolkit
// $ npm i --save-dev @types/react-redux
