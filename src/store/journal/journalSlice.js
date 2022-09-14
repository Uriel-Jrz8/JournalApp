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
                    imageUrls: []
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
        setPhotosToActiveNote: (state, action) => {
            state.active.imagesUrls = [ ...state.active.imagesUrls, ...action.payload ];
            state.isSaiving = false;

        },

        clearNotesLogout: (state) =>{
            state.isSaiving = false;
            state.messageSaved = '';
            state.notes=[];
            state.active = null;

        },
        deleteNoteByID: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(notes => notes.id !== action.payload);
            
        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmpyNote, setActiveNote, setNotes, setSaving, updatedNote, deleteNoteByID,SavingNewNote,setPhotosToActiveNote,clearNotesLogout } = journalSlice.actions;