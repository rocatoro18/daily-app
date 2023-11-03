import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/provider';
import { clearNotesLogout } from '../daily/dailySlice';
import { login, logout, checkingCredentials } from './';

// THUNK
export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

// THUNK
export const startGoogleSignIn = () => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        //console.log({result});
        if(!result.ok) return dispatch(logout(result));
        //delete result.ok;
        dispatch(login(result));

    }
}

// THUNK 
export const startCreatingUserWithEmailPassword = ({email, password, displayName}) =>{
    return async(dispatch) => {

        dispatch(checkingCredentials());
        
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));

    }
}

// THUNK
export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        
        const {ok, errorMessage, uid, displayName, photoURL} = await loginWithEmailPassword({email,password});
        //console.log(`resp thunk error: ${errorMessage}`);
        //console.log(`resp thunk ok: ${uid} ${displayName} ${photoURL}`);
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL, ok}));

    }
}

// THUNK
export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}