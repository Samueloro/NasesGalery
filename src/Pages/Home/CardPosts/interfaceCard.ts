import { commentsInterface } from "../navbarInterfaces";

export interface UserImage {
    url: string;
    username: string;
  }


  export interface imageDataInterface{
    id:string;
    user:string;
    img: string;
    comments:commentsInterface[];
    likes:string[]
}

