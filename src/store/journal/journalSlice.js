import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaiving: false, // si esta en true debe estar desabilitado
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
        SavingNewNote: (state) =>{
            state.isSaiving = true;
        },
        addNewEmpyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaiving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
        },
        setNotes: (state, action) => {
            state.notes = ( action.payload );
        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteByID: (state, action) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmpyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteByID,SavingNewNote } = journalSlice.actions;