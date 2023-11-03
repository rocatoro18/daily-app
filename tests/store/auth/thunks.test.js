import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/provider';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/daily/dailySlice';
import { demoUser } from '../../fixtures/authFixtures';

// HACER MOCK DE ESTA DEPENDENCIA
// CUALQUIER COSAS QUE REGRESE ESTE PATH YA ES UNA
// FUNCION MOCK DE JEST
jest.mock('../../../src/firebase/provider');

describe('Pruebas en AuthThunks',()=>{

    // FUNCION DE JEST
    const dispatch = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('debe de invocar el checkingAuthentication', async()=>{
        // CALLBACK ASINCRONO?
        // PRIMER ARGUMENTO: LLAMADO DE LA FUNCION
        // SEGUNDO ARGUMENTO: LLAMADO DE RETORNO DE LA FUNCION
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    });

    test('startGoogleSignIn debe de llamar checkingCredenditals y login - Exito', async()=>{

        const loginData = {ok: true, ...demoUser};
        // MOCK DE GOOGLE SIGN IN GRACIAS A jest.mock('../../../src/firebase/provider');
        // POR SI MISMO YA ES UN MOCK
        // MOCK PROCEDIMIENTO QUE VA A FIREBASE
        await signInWithGoogle.mockResolvedValue(loginData);

        // THUNK
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));


    });

    test('startGoogleSignIn debe de llamar checkingCredenditals y login - Error', async()=>{

        const loginData = {ok: false, errorMessage:'Un Error en Google'};
        await signInWithGoogle.mockResolvedValue(loginData);
        // THUNK
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async()=>{
        const loginData = {ok:true, ...demoUser};
        const formData = {email:demoUser.email, password:'123456'};

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async()=>{
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());


    });

});