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
        console.log({result});
    }
}