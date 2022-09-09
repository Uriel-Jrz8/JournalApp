import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";



export const useCheckAuth = () => {

    const {status} = useSelector( state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged( FirebseAuth, async( user ) => {
            //Verificando si tenemos un nuevp usuario
            if(!user) return dispatch( logout() );
            
            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }))
            dispatch( startLoadingNotes());
        } )
    },[]);

    return {
        status
    }
}
