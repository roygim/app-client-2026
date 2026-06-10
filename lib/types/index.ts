export enum ResponseError {
    InValidRequest = "InvalidRequest",
    NotFound = "NotFound",
    Unauthorized = "Unauthorized",
    InternalServerError = "InternalServerError"
}

export enum UserRole {
    Admin = 1,
    Regular = 2
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: UserRole;
}