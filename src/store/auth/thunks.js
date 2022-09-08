import { loginWithEmailPassword, logoutFirebase, registerUserWhithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredenciales, login, logout } from "./authSlice"


export const checkingAuthentication = ( email,password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredenciales() );
    }
}


export const startGoogleSignIn = () => {
    return async( dispatch ) =>{
        
        dispatch( checkingCredenciales() );
        const result = await singInWithGoogle();
        if ( !result.ok ){
            return dispatch( logout( result.errorMessage ) );
        } 
        dispatch( login(result) );
    }
}



export const startCreatingUser = ( { email, password, displayName} ) =>{
    return async(dispatch) => {
        dispatch( checkingCredenciales() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWhithEmailPassword( { email, password, displayName } );
        if ( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({  uid, displayName, email, photoURL }));
    }

}


export  const startLoginWithEmailPassword = ({ email, password }) =>{

    return async(dispatch) => {
        dispatch( checkingCredenciales() ); //para bloquear botones

        const {ok, errorMessage, uid, displayName, photoURL} = await loginWithEmailPassword( { email, password } );
        if( !ok ) return dispatch( logout({ errorMessage }) );
        dispatch( login({ uid, displayName, photoURL }));
    }
}


export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() );
    }
}