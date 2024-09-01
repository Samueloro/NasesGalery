export interface folderInterface{
    id:string;
    img: string;
    comments:commentsInterface[];
    likes:string[]
}


export interface commentsInterface {
    user:string;
    comment:string;
}