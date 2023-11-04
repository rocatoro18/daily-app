import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'duryxhsmt',
    api_key: '452342772999982',
    api_secret: 'C2fVc1HcbIwixV7Z-D8bpXOdvUE',
    secure: true
})

describe('Pruebas en fileUpload',()=>{

    test('debe de subir el archivo correctamente a cloudinary', async()=> {
        
        // IMAGEN DE INTERNET
        const imageUrl = 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwb3JpZW50YXRpb258ZW58MHx8MHx8fDA%3D';
        const resp = await fetch(imageUrl);
        // BLOB PARA CREAR ARCHIVO
        const blob = await resp.blob();
        const file = new File([blob],'foto.jpg');


        // CREAR ARCHIVO CON IMAGEN
        const url = await fileUpload(file);
        //console.log(url);
        expect(typeof url).toBe('string');

        // LLAMADA A CLOUDINARY PARA ELIMINAR IMAGENES
        //console.log(url);

        // EXTRAER EL ID
        const segments = url.split('/');
        //console.log(segments);
        const imageId = segments[segments.length - 1].replace('.jpg','');
        //console.log({imageId});
        // ELIMINAR IMAGEN DE CLOUDINARY
        const cloudResponse = await cloudinary.api.delete_resources(['daily-app/'+imageId],{
            resource_type: 'image'
        });
        //console.log({cloudResponse});
    });

    test('debe de retornar un null', async() => {
        const file = new File([],'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);

    });

});