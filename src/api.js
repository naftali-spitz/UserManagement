import axios from "axios";

const API_URL = 'https://server-n42x.onrender.com/api';
// let token = localStorage.getItem('token')
const getToken = () => localStorage.getItem('token')

const api = axios.create({
    baseURL: API_URL,
});

// TODO: add const for headers
export const login = async (username, password) => {
    try {
        const response = await api.post('auth/login', { username, password});
        const {token} = response.data
        setTimeout(() => {
            localStorage.removeItem('token')
        }, 1000 * 60)
        localStorage.setItem('token', token)
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login Failed');
    }
}

export const fetchUsers = async () => {
    try {     
        const response = await api.get('users', {
            headers: {
                Authorization: getToken(),
            },
        })      
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve users');
    }
}

export const fetchUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve user');
    }
}

// asuming that the user id is created by the server
export const addUser = async (userData) => {
    try {
        const response = await api.post(`/users`, userData, {
            headers: {
                Authorization: getToken(),
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add new user');
    }
}

// add: validation based on database schema
// add: check if user exists
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData, {
            headers: {
                Authorization: getToken(),
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update user');
    }
}

export const deleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`, {
            headers: {
                Authorization: getToken(),
            }
        })
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const hasToken = () => getToken() ? true : false