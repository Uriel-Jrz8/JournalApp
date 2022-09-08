import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaiving: true,
        messageSaved: '',
        notes: [],
        active: null,
/*         active: {
            id:  'ABC',
            title: '',
            body:'',
            date: 123,
            imagesUrls: []
        } */

    },
    reducers: {
        increment: (state, /* action */) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = journalSlice.actions;