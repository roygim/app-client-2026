
import { mockUsers } from "../mock/users.mock";
import * as usersRepositpry from "../repository/users.repository";
import { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
    try {
        // return mockUsers
        const data = await usersRepositpry.getUsers();
        return data;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async ({ email, password }: { email: string, password: string }) => {
    try {
        const data = await usersRepositpry.loginUser({ email, password });
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const loadUser = async () => {
    try {
        const data = await usersRepositpry.loadUser();
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const data = await usersRepositpry.logoutUser();
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const addUser = async ({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) => {
    try {
        const data = await usersRepositpry.addUser({ firstname, lastname, email, password });
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const editUser = async ({ userId, firstname, lastname }: { userId: number, firstname: string, lastname: string }) => {
    try {
        const data = await usersRepositpry.editUser({ userId, firstname, lastname });
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const deleteUser = async ({ userId }: { userId: number }) => {
    try {
        const data = await usersRepositpry.deleteUser({ userId });
        return data;
    }
    catch (error) {
        throw error;
    }
}