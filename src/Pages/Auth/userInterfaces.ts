export interface registerUser{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface loginUser {
    email:string;
    password:string;
}

export interface loginErrors {
    email:string;
    password:string;
}

export interface registerErrors {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}