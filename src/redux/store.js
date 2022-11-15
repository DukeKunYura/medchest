import { configureStore } from '@reduxjs/toolkit';
import masterReducer from '../redux/masterSlice'

export const store = configureStore({
    reducer: {
        master: masterReducer
    },
})