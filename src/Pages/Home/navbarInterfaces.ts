export interface folderInterface{
    id:string;
    user:string | undefined;
    img: string;
    comments:commentsInterface[];
    likes:string[]
}


export interface commentsInterface {
    user:string | undefined;
    comment:string;
}