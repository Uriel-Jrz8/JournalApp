import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebseAuth } from './config';



const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebseAuth, googleProvider); //creando el popUp de google
        //const credentials = GoogleAuthProvider.credentialFromResult(result); // ver las credenciales
        const { displayName, email, photoURL, uid } = result.user;
        console.log({ displayName, email, photoURL, uid });
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = await error.code;
        const errorMessage = await error.message
        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerUserWhithEmailPassword = async ({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(FirebseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        //console.log(error);
        return {
            ok: false,
            errorMessage: 'Esta cuenta de correo ya ha sido utilizada.'
        }
    }
}


export const loginWithEmailPassword = async ( { email, password } ) =>{
    try {
        const resp = await signInWithEmailAndPassword(FirebseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: 'Correo o Contrseña Incorrectos.'
        }
    }
}



export const logoutFirebase = async() => {
    return await FirebseAuth.signOut();
}