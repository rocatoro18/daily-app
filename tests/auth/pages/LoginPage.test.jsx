import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice} from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();


jest.mock('../../../src/store/auth/thunks',()=>({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    }
}));

// NO DEBEMOS DE SOBREESCRIBIR TODAS LAS FUNCIONES DE
// REACT REDUX, EN ESTE CASO SOLO NOS INTERESA MODIFICAR EL
// COMPORTAMIENTO DEL USEDISPATCH
// PARENTESIS PARA INDICAR QUE QUIERO REGRESAR UN OBJETO
jest.mock('react-redux',()=>({
    ...jest.requireActual('react-redux'),
    // ESTUDIAR useDispatch: () => (fn) => fn(),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer:{
    auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
    
})

describe('Pruebas en <LoginPage />', ()=> {

    beforeEach(()=> jest.clearAllMocks());
    
    test('debe de mostrar el componente correctamente',()=>{
        // MONTAR COMPONENTE
        render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
        );

        //screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('boton de Google debe de llamar el startGoogleSignIn',()=>{
        
        // MONTAR COMPONENTE
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
            );

        //console.log(store.getState());
        const googleBtn = screen.getByLabelText('google-btn');
        //console.log(googleBtn);
        fireEvent.click(googleBtn);
        //console.log(store.getState());
        //screen.debug();
        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('debe de llamar starLoginWithEmailPassword',()=>{

        const email = 'roberto@google.com';
        const password = '123456';

        // MONTAR COMPONENTE
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
            );

            // DIFERENTES FORMAS DE TOMAR ELEMENTOS DEL DOM
            // TOMAR ELEMENTOS DEL DOM
            const emailField = screen.getByRole('textbox',{name:'Correo'});
            //console.log(emailField);
            //screen.debug();
            fireEvent.change(emailField,{target:{name:'email',value:email}});

            // DIFERENTE POR SER UN INPUT CONTRASEÑA
            const passwordField = screen.getByTestId('password');
            fireEvent.change(passwordField,{target:{name:'password',value:password}});


            const loginForm = screen.getByLabelText('submit-form');
            fireEvent.submit(loginForm);

            expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
                email: email,
                password: password
            });

    });

});