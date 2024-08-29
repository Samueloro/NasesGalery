import { registerErrors, registerUser } from "../userInterfaces";

export const validationRegister = (input:registerUser):registerErrors =>{
    const regexEmail = /\S+@\S+.\S+/;
    const regexPasswordNumber= /[0-9]/ 
    const regexPasswordWord= /[a-zA-Z]/ 
    const regexPasswordSpecial= /[!@#$%&*()<>|]/ 
    const error:registerErrors = {
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    }
    
    if(!regexEmail.test(input.email)){
        error.email='Correo invalido'
    }
    if(!input.email){
        error.email='Debe ingresar un correo'
    }
    if(!input.firstName){
        error.firstName='Debe ingresar un Nombre'
    }
    if(input.firstName.length < 3){
        error.firstName='El nombre ingresado no es valido'
    }
    if(!input.lastName){
        error.lastName='Debe ingresar un Apellido'
    }
    if(input.lastName.length < 3){
        error.lastName='El apellido ingresado no es valido'
    }
    if(!regexPasswordNumber.test(input.password)){
        error.password = 'La contraseña debe tener por lo menos un número'
    }
    if(!regexPasswordSpecial.test(input.password)){
        error.password = 'La contraseña debe tener por lo menos un caracter especial'
    }
    if(!regexPasswordWord.test(input.password)){
        error.password = 'La contraseña debe tener por lo menos una letra'
    }
    if(input.password.length < 6  || input.password.length > 10){
        error.password =  'La contraseña debe contener entre 6 y 10 caracteres'
    }

    return error;
};
