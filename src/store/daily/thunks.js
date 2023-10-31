import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './dailySlice';
import { fileUpload, loadNotes } from '../../helpers';

// THUNK
export const startNewNote = () => {
    // getState funcion para obtener la informacion del estado
    return async( dispatch, getState) => {
        
        //console.log('startNewNote');
        // TODO: Tarea
        dispatch(savingNewNote());
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

        // creando propiedad id a nota
        newNote.id = newDoc.id;

        //! dispatch
        // payload = newNote
        dispatch(addNewEmptyNote(newNote));
        // podemos mandar dispatch a cualquier parte 
        // de nuestro store
        dispatch(setActiveNote(newNote));
    }
}

// THUNK
export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        // getState funcion para obtener la informacion del estado
        const {uid} = getState().auth;

        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

        //console.log({uid});

    }
}

// THUNK
export const startSaveNote = () => {
    return async(dispatch, getState) => {
        
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().daily;

        // spread de la note
        const noteToFireStore = {...note};
        // delete forma para eliminar una propiedad de un objeto
        // propia de javascript
        delete noteToFireStore.id;

        // REFERENCIA AL DOCUMENTO
        const docRef = doc(FirebaseDB, `${uid}/daily/notes/${note.id}`);
        // FORMA DE IMPACTAR EN LA BASE DE DATOS DE FIREBASE
        await setDoc(docRef, noteToFireStore,{merge: true});
        // MANDAR NOTA ACTUALIZADA CON ID
        dispatch(updateNote(note));

    }
}

// THUNK
export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        // PONER APP EN ESTADO DE CARGA Y BLOQUEAR TODO
        dispatch(setSaving());

        //await fileUpload(files[0]);
        // DISPARAR TODAS LA PETICIONES EN SECUENCIA (ARREGLO DE PROMESAS) 
        const fileUploadPromises = [] ;

        for(const file of files) {
            // CREANDO ARREGLO DE PROMESAS
            fileUploadPromises.push(fileUpload(file));
        }

        // ESTE ESPERA UN ARREGLO DE PROMESAS
        const photosUrls = await Promise.all(fileUploadPromises);

        //console.log(photosUrls);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}