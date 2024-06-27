import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/Pet-mate-matches/";

export const getPetMateMatches = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addPetMateMatch = async (match) => {
    const response = await axios.post(API_URL, match);
    return response.data;
};

export const updatePetMateMatch = async (id, match) => {
    const response = await axios.put(`${API_URL}${id}/`, match);
    return response.data;
};

export const deletePetMateMatch = async (id) => {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
};