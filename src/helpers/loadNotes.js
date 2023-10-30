import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


export const loadNotes = async(uid = '') => {
    if(!uid) throw new Error('El UID del usuario no existe');

    // query apuntando a la collecion que quiero sacar
    const collectionRef = collection(FirebaseDB, `${uid}/daily/notes`);
    // traer documentos de la coleccion
    // se pueden agregar filtros en el collectionRef, como order by
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach(doc => {
        //...doc.data() esparcir toda la info que esta ahi
        notes.push({id: doc.id,...doc.data()});
    })
    //console.log(notes);

    return notes;

}