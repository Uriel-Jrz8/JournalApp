import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmpyNote, setActiveNote, SavingNewNote, setNotes } from "./";



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