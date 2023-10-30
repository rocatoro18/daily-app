import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

export const NoteView = () => {
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
                <Typography fontSize={39} fontWeight='light'>18 de noviembre, 2023</Typography>
            </Grid>
            <Grid item>
                <Button color="primary" sx={{padding:2}}>
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
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio hoy?"
                    minRows={5}
                />

            </Grid>

            {/* Image Gallery */}
            <ImageGallery/>

        </Grid>
    )
}