import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote } from '../../store/daily/dailySlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/daily/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const {active:note, messageSaved, isSaving} = useSelector(state => state.daily);

    const {body, title, date, onInputChange, formState} = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    },[date])

    // PARA ESTO ES MUY UTIL EL USEREF
    const fileInputRef = useRef();

    useEffect(()=>{
        dispatch(setActiveNote(formState));
    },[formState])

    useEffect(()=> {
        if(messageSaved.length > 0){
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    },[messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
        //console.log('Subiendo archivos');
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        // GRID PERMITE ORGANIZARNOS MEJOR EN LUGAR DE UN BOX
        <Grid 
        container 
        direction='row' 
        alignItems='center' 
        justifyContent='space-between' 
        sx={{mb:1}}
        className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                    // PARA ESTO ES MUY UTIL EL USEREF
                    ref={fileInputRef}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    // PARA ESTO ES MUY UTIL EL USEREF
                    // ESTO SIMULA EL CLICK DEL INPUT
                    onClick={()=> fileInputRef.current.click()}
                >
                    <UploadOutlined/>
                </IconButton>

                <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{padding:2}}>
                    <SaveOutlined sx={{fontSize:30,mr:1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{border:'none',mb:1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />

            </Grid>

            <Grid justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline/>
                    Borrar   
                </Button>
            </Grid>

            {/* Image Gallery */}
            <ImageGallery images={note.imageUrls}/>

        </Grid>
    )
}