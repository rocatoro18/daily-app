import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/daily/dailySlice";
import { startNewNote } from "../../../src/store/daily/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en DailyThunks',()=>{
    
    const dispatch = jest.fn();
    const getState = jest.fn();


    // ASEGURARNOS QUE LAS FUNCIONES MOCK ESTEN LIMPIAS
    beforeEach(()=>jest.clearAllMocks());


    test('debe de crear una nueva nota en blanco', async()=>{
        
        const uid = 'TEST-UID';

        getState.mockReturnValue({auth:{uid: uid}});

        await startNewNote()(dispatch,getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
        }));

        // Borrar de firebase
        const collectionRef = collection(FirebaseDB,`${uid}/daily/notes`);

        const docs = await getDocs(collectionRef);

        // CONTENER TODAS LAS PROMESAS DE LAS ELIMINACIONES
        // DE LOS ARCHIVOS
        const deletePromises = [];
        // CREAR EL ARREGLO DE TODAS LAS PROMESAS
        docs.forEach(doc=>deletePromises.push(deleteDoc(doc.ref)));

        //console.log(deletePromises);

        // BORRAR TODAS LAS NOTAS QUE TENEMOS EN FIREBASE
        await Promise.all(deletePromises);

    });

});