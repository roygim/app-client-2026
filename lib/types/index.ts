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
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}