import { signInWithGoogle } from '../../firebase/provider';
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
        if(!result.ok) return dispatch(logout(result));
        //delete result.ok;
        dispatch(login(result));

    }
}