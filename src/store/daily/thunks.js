import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

// THUNK
export const startNewNote = () => {
    // getState funcion para obtener la informacion del estado
    return async( dispatch, getState) => {
        
        console.log('startNewNote');
        // quiero el uid y buscalo dentro del nodo de
        // authentication
        const {uid} = getState().auth;
        console.log(uid);
        // uid

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        // template string ``
        // con esto ya tenemos la referencia al punto notes
        const newDoc = doc(collection(FirebaseDB,`${uid}/daily/notes`));
        // insertar en la db de firebase
        const setDocResp = await setDoc(newDoc, newNote);

        //console.log({newDoc, setDocResp});
        //console.log(setDocResp);

        //! dispatch
        // dispatch(newNote)
        // dispatch(activateNote)

    }
}