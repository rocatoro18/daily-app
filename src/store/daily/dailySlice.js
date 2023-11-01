
import { createSlice } from '@reduxjs/toolkit';

export const dailySlice = createSlice({
    name: 'daily',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        /*active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 12345678,
            imageUrls: [], // https:///foto1.jpg, https:///foto2.jpg, https:///foto3.jpg, 
        }*/

    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            // TODO: MENSAJE DE ERROR
            state.messageSaved = '';
        },
        updateNote: (state, action) => { // payload: note
            // ACTUALIZAR REFERENCIA LOCAL PARA NO LLEGAR A OTRO LUGAR
            state.isSaving = false;
            // ESTUDIAR MAS EL MAP
            state.notes = state.notes.map(note => {

                if(note.id === action.payload.id){
                    // HACER ESTO PARA REGRESAR LA NOTA ACTUALIZADA
                    return action.payload;
                }

                return note;
            });
            // TODO: MOSTRAR MENSAJE DE ACTUALIZACION
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            // SPREAD DE FOTOS ANTERIORES Y CONCATENACION CON ARREGLO ANTERIOR
            // PRESERVAMOS ANTERIORES Y HACEMOS APPEND DE NUEVAS
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;

        }
        ,
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
        ,
        deleteNoteById: (state, action) => {
            state.active = null;
            // FILTRAR PARA REGRESAR LAS NOTAS DIFERENTES A LA QUE SE MANDO POR EL ACTION
            // CON REDUX TOOLKIT
            state.notes = state.notes.filter(note => note.id !== action.payload);
            // SIN REDUX TOOLKIT
            /*
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
            */
        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById , savingNewNote, setPhotosToActiveNote, clearNotesLogout} = dailySlice.actions;