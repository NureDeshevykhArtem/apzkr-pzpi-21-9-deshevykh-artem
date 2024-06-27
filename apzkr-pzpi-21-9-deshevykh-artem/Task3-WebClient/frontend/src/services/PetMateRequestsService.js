import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/Pet-mate-requests/";

export const getPetMateRequests = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching pet mate requests:", error);
        throw error;
    }
};

export const addPetMateRequest = async (request) => {
    try {
        const response = await axios.post(API_URL, request);
        return response.data;
    } catch (error) {
        console.error("Error adding pet mate request:", error);
        throw error;
    }
};

export const updatePetMateRequest = async (id, request) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, request);
        return response.data;
    } catch (error) {
        console.error("Error updating pet mate request:", error);
        throw error;
    }
};

export const deletePetMateRequest = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting pet mate request:", error);
        throw error;
    }
};