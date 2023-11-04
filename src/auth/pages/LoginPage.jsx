import {Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

// PARA EVIAR ESO SE HACE ESE FORMULARIO DESDE AFUERA
const formData = {
    email: '',
    password: ''
};

export const LoginPage = () => {

    const dispatch = useDispatch();
    const {status, errorMessage} = useSelector(state => state.auth);
    //console.log(`error login page: ${errorMessage}`);
    //console.log(status);
    // SE PONE EL FORM DATA AFUERA PORQUE CADA VEZ QUE SE RENDERIZA TIENE QUE TOMAR EL MISMO OBJETO,
    // SI ESE OBJETO ESTA ADENTRO SE CREA UN BUCLE POR QUE EN CADA RENDERIZACION
    // SE TOMARIA COMO UN OBJETO DIFERENTE
    const {email, password, onInputChange, formState} = useForm(formData);

    const isAuthenticating = useMemo(()=> status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        //console.log({email,password});
        //! NO ES ESTA LA ACCION A DESPACHAR
        dispatch(startLoginWithEmailPassword({email,password}));
        //console.log(formState);
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
        console.log('onGoogleSignIn');
    }

    return (
        <AuthLayout title="Login">
            <form
            aria-label= "submit-form"
            onSubmit={onSubmit} 
            className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{marginTop:2}}>
                        <TextField 
                        label="Correo" 
                        type="email" 
                        placeholder="correo@google.com"
                        fullWidth
                        name= "email"
                        value={email}
                        onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginTop:2}}>
                        <TextField 
                        label="Contraseña" 
                        type="password" 
                        placeholder="Contraseña"
                        fullWidth
                        name= "password"
                        inputProps={{
                            'data-testid': 'password'
                        }}
                        value={password}
                        onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid 
                            item 
                            xs={12}
                            // ESTUDIAR MAS EL !!errorMessage
                            display={!!errorMessage ? '' : 'none' }
                        >
                           <Alert severity='error'>
                                {errorMessage}
                           </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                disabled={isAuthenticating}
                                type="submit" 
                                variant='contained' 
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                disabled={isAuthenticating}
                                variant='contained' 
                                fullWidth
                                aria-label="google-btn"
                                onClick={onGoogleSignIn}
                            >
                                <Google/>
                                <Typography sx={{ml:1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout>
    )
}