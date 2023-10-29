import {Link as RouterLink} from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    // PRIMERA POSICION ARREGLO: FUNCION QUE EVALUA,
    // SEGUNDA POSICION ARREGLO: MENSAJE DE ERROR
    email: [(value) => value.includes('@'), 'El correo debe de tener un @.'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);
    //console.log(displayNameValid);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if(!isFormValid) return;
        //console.log(formState);
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={onSubmit}>
                <Grid container>
                    
                    <Grid item xs={12} sx={{marginTop:2}}>
                        <TextField 
                        label="Nombre completo" 
                        type="text" 
                        placeholder="Nombre completo"
                        fullWidth
                        name="displayName"
                        value={displayName}
                        onChange={onInputChange}
                        // ESTUDIAR EL OPERADOR !!
                        error={!!displayNameValid && formSubmitted}
                        helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{marginTop:2}}>
                        <TextField 
                        label="Correo" 
                        type="email" 
                        placeholder="correo@google.com"
                        fullWidth
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        // ESTUDIAR EL OPERADOR !!
                        error={!!emailValid && formSubmitted}
                        helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginTop:2}}>
                        <TextField 
                        label="Contraseña" 
                        type="password" 
                        placeholder="Contraseña"
                        fullWidth
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        // ESTUDIAR EL OPERADOR !!
                        error={!!passwordValid && formSubmitted}
                        helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid item xs={12}>
                            <Button type="submit" variant='contained' fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}