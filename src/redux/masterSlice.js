import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    isActiveAdderWindow: false,
    categories: [
        { id: "1", name: "Антибиотики" },
        { id: "2", name: "Анальгетики" },
        { id: "3", name: "Витамины" },
        { id: "4", name: "Спазмальгетики" }],
    medications: [
        { id: "353t6356", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "57457ytr", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "yt56y46y", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "45yy4y54", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "54y45y54", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "gtg5y554", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "3465tytg", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "435trter", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "tyy45644", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "fwer2352", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "eeer3434", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "ef435453", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "fe433455", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "434t4556", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "dfe44535", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "sdfew343", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "tht66767", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "ill78887", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "k7878777", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "k787i887", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "76j67i76", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "jjtyj676", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "gf676657", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "jyu77876", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "kjkjyu76", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "yj766788", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "eeery434", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "hj786786", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "ytytutyu", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "ttt54556", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "fgrt4545", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" },
        { id: "jmku7886", name: "Фуфломицин", category: "антибиотик", expiration: "16,09,23", quantity: "87" }]

};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {

        setSearch: (state, action) => {
            state.search = action.payload
        },
        addMedication: (state) => {
            state.medications = [...state.medications, action.payload];
        },
        setIsActiveAdderWindow: (state, action) => {
            state.isActiveAdderWindow = action.payload
        },
        addCategory: (state, action) => {
            state.category = [...state.category, action.payload];
        }

    }
});


export const { setSearch, addMedication, setIsActiveAdderWindow, addCategory } = masterSlice.actions

export default masterSlice.reducer