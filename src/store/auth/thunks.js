import { singInWithGoogle } from "../../firebase/providers";
import { checkingCredenciales, login, logout } from "./authSlice"


export const checkingAuthentication = ( email,password ) => {
    return async( dispatch ) => {
        dispatch(checkingCredenciales());
    }
}


export const startGoogleSignIn = () => {
    
    return async( dispatch ) =>{
        dispatch(checkingCredenciales());
        
        const result = await singInWithGoogle();
        if ( !result.ok ) dispatch( logout(result.errorMessage) );

        dispatch( login(result) );
    }
}