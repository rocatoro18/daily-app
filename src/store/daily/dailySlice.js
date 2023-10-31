
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
        deleteNoteById: (state, action) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById , savingNewNote} = dailySlice.actions;