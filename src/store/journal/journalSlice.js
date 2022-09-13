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
                    u: []
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
            state.active = action.payload;
            state.messageSaved= '';
        },
        setNotes: (state, action) => {
            state.notes = ( action.payload );
        },
        setSaving: (state) => {
            state.isSaiving = true;
            state.messageSaved= '';
        },
        updatedNote: (state, action) => {
            state.isSaiving = false;
            state.notes = state.notes.map( note =>{
                if( note.id === action.payload.id ){
                    return action.payload;
                }
                return note;
            });

            //mostrat mensaje de actualizacion
            state.messageSaved = `${ action.payload.title}, actulizada correctamente`;
            
        },
        deleteNoteByID: (state, action) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmpyNote, setActiveNote, setNotes, setSaving, updatedNote, deleteNoteByID,SavingNewNote } = journalSlice.actions;