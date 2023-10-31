

export const fileUpload = async (file) => {

    if(!file) throw new Error('No tenemos ningun archivo a subir');

    const cloudUrl = `https://api.cloudinary.com/v1_1/duryxhsmt/upload`;

    // CONSTRUIR FORM DATA (BODY)
    const formData = new FormData();
    // LLAVE Y VALOR
    formData.append('upload_preset','react-daily-app');
    formData.append('file',file);

    try {
        // PETICION POST
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        });

        //console.log(resp);

        if(!resp.ok) throw new Error('No se pudo subir imagen');

        // SERIALIZAR BODY
        const cloudResp = await resp.json();

        //console.log(cloudResp);

        return cloudResp.secure_url;

    } catch (error) {
        //console.log(error);
        throw new Error(error.message);
    }


}