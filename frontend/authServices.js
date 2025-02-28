import axios from "axios";

const API_URL = "http://localhost:8080/auth";  // Backend ka URL

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;  // Success message ya token return karega
    } catch (error) {
        throw error.response.data; // Error handle karega
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
