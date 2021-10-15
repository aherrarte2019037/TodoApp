export interface User {
    userName : string;
    firstName: string;
    lastName : string;
    email    : string;
    fullName?: string;
    password?: string;
    id?      : number;
}