export interface registerUser{
    email:string;
    password:string;
    userName:string;
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
    email:string;
    password:string;
    userName:string;

}