import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmpyNote, setActiveNote, SavingNewNote, setNotes } from "./";
import { setSaving,updatedNote } from "./journalSlice";



export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(SavingNewNote());
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const resp = await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(addNewEmpyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}


export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usurio no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
} 

export const startSavingNote = () =>{
    return async(dispatch,getState) =>{

        const notes = await loadNotes(uid);
    }
}

//funcion pra actualizar y manda a grabar en la BD los datos de una nota.
export const startSaveNote = () => {
    return async( dispatch, getState) => {

        dispatch(setSaving());

        const { uid } =  getState().auth;
        const { active: notaActiva } = getState().journal;
        const noteToFireStore = { ...notaActiva};
        delete noteToFireStore.id

        const docRef  = doc( FirebaseDB, `${ uid }/journal/notes/${ notaActiva.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true  } )

        dispatch( updatedNote(notaActiva) );
    }
}