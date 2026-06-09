
import axios from "axios";

export const getUsers = async () => {
    try {
        const url = `${process.env.API_BASE_URL}/users`;

        const response = await axios.get(url, { withCredentials: true });

        if (response && response.data && response.data.success) {
            return response.data.data;
        } else {
            throw new Error('error to get users');
        }
    }
    catch (error) {
        throw error;
    }
}

export const loginUser = async ({ email, password }: { email: string, password: string }) => {
    try {
        const url = `${process.env.API_BASE_URL}/login`;

        const data = {
            email,
            password
        };

        const response = await axios.post(url, data, { withCredentials: true });

        if (response && response.data && response.data.success) {
            return response.data.data;
        } else {
            throw new Error('error to get user');
        }
    }
    catch (error) {
        throw error;
    }
}

export const loadUser = async () => {
    try {
        const url = `${process.env.API_BASE_URL}/loaduser`;

        const response = await axios.post(url, null, { withCredentials: true });

        if (response && response.data && response.data.success) {
            return response.data.data;
        } else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const url = `${process.env.API_BASE_URL}/logout`;

        const response = await axios.delete(url, { withCredentials: true });

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error('error to logout user');
        }
    }
    catch (error) {
        throw error;
    }
}

export const addUser = async ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
    try {
        const url = `${process.env.API_BASE_URL}/adduser`;

        const data = {
            firstName,
            lastName,
            email,
            password
        };

        const response = await axios.post(url, data, { withCredentials: true });

        if (response && response.data && response.data.success) {
            return response.data.data;
        } else {
            throw new Error('error to add user');
        }
    }
    catch (error) {
        throw error;
    }
}

export const editUser = async ({ userId, firstName, lastName }: { userId: number, firstName: string, lastName: string }) => {
    try {
        const url = `${process.env.API_BASE_URL}/edituser/${userId}`;

        const data = {
            firstName,
            lastName
        };

        const response = await axios.put(url, data, { withCredentials: true });

        if (response && response.data && response.data.success) {
            return response.data.data;
        } else {
            throw new Error('error to edit user');
        }
    }
    catch (error) {
        throw error;
    }
}

export const deleteUser = async ({ userId }: { userId: number }) => {
    try {
        const url = `${process.env.API_BASE_URL}/deleteuser/${userId}`;

        const response = await axios.delete(url, { withCredentials: true });

        if (response && response.data && response.data.success) {
            return response.data;
        } else {
            throw new Error('error to delete user');
        }
    }
    catch (error) {
        throw error;
    }
}