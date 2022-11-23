import React from 'react';
import Main from './src/components/Main';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
// подключенные зависимости
// $ npm i react-redux @reduxjs/toolkit
// $ npm i --save-dev @types/react-redux
