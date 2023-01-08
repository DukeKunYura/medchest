import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    isActiveAdderWindow: false,
    categories: ["антибиотики", "анальгетики", "витамины", "спазмальгетики"],
    medications: [
        {
            id: "353t6356", name: "Поликор", category: "антибиотик", expiration: "16,09,23", quantity: "87",
            note: "jnbfbgfkjb grgjnbfbgrtt tr r rr  t rtrhgtr tr."
        },]

};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setStartMedications: (state, action) => {
            state.medications = action.payload;
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
    setSearch,
    addMedication,
    editMedication,
    setIsActiveAdderWindow,
    addCategory,
    deleteMedication } = masterSlice.actions;

export default masterSlice.reducer