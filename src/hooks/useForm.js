import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(()=>{
        createValidators();
    },[formState])

    useEffect(()=>{
        setFormState(initialForm);
    },[initialForm])

    // QUIERO USAR UN USEMEMO PARA MEMORIZAR EL VALOR
    const isFormValid = useMemo(()=>{
        
        // Object.keys SE USA PARA BARRER CADA UNA DE LAS KEYS
        for(const formValue of Object.keys(formValidation)){
            // EL RETURN SE SALE COMPLETAMENTE DE LA FUNCION
            // PURA LOGICA JAVASCRIT
            if(formValidation[formValue] !== null) return false; 
        }
        return true;
    },[formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        
        const formCheckedValues = {};

        // PURA LOGICA JAVASCRIPT
        for(const formField of Object.keys(formValidations)){
            const[fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            //console.log(formCheckedValues);
        }

        setFormValidation(formCheckedValues);

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}