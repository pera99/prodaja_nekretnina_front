export interface User{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirm_password: string;
    city: string;
    telephone: string;
    email: string;
    birthday: Date;
    image: File;
    type: string;
    advertiserType?: string;
    agency?: string;
    licence?: number;
}