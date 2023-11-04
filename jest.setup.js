// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { getEnvironments } from './src/helpers/getEnvironments';

// NECESARIO PARA QUE FUNCIONE EL .env.test 
// EN JEST
require('dotenv').config({
    path: '.env.test'
})

// MOCK DEL ARCHIVO DE ESE PATH PARA QUE FUNCIONE EL TESTING
jest.mock('./src/helpers/getEnvironments',()=>({
    getEnvironments: () => ({...process.env})
}));