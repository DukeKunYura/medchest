import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    isActiveAdderWindow: false,
    categories: ["антибиотики", "анальгетики", "витамины", "спазмальгетики"],
    medications: []

};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setStartMedications: (state, action) => {
            state.medications = action.payload;
        },
        setStartCategories: (state, action) => {
            let items = action.payload.map(item => item.category);
            let uniqueItems = [...new Set(items)]
            state.categories = uniqueItems;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        addMedication: (state, action) => {
            state.medications = [action.payload, ...state.medications];
        },
        editMedication: (state, action) => {
            state.medications = state.medications.filter(item => item.id !== action.payload.id)
            let medication = action.payload.allValues;
            medication.id = action.payload.id;
            state.medications = [medication, ...state.medications];
            console.log(medication);
        },
        deleteMedication: (state, action) => {
            state.medications = state.medications.filter(item => item.id !== action.payload)
        },
        setIsActiveAdderWindow: (state, action) => {
            state.isActiveAdderWindow = action.payload
        },
        addCategory: (state, action) => {
            state.categories = [...state.categories, action.payload]
        }
    }
});


export const {
    setStartMedications,
    setStartCategories,
    setSearch,
    addMedication,
    editMedication,
    setIsActiveAdderWindow,
    addCategory,
    deleteMedication } = masterSlice.actions;

export default masterSlice.reducer