export interface User {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    authProvider: string;
}
