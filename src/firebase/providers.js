import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebseAuth } from './config';



const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebseAuth, googleProvider); //creando el popUp de google
        //const credentials = GoogleAuthProvider.credentialFromResult(result); // ver las credenciales
        const { displayName, email, photoURL, uid } = result.user;

        console.log( { displayName, email, photoURL, uid } );
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