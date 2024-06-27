import axios from "axios";

export function getPets() {
  return axios.get("http://127.0.0.1:8000/api/Pets/")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching pets:", error);
      throw error;
    });
}

export function deletePet(id) {
  return axios.delete(`http://127.0.0.1:8000/api/Pets/${id}/`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error deleting pet:", error);
      throw error;
    });
}

export function addPet(pet) {
  return axios.post("http://127.0.0.1:8000/api/Pets/", {
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    gender: pet.gender,
    owner: pet.owner
  })
    .then(response => response.data)
    .catch(error => {
      console.error("Error adding pet:", error);
      throw error;
    });
}

export function updatePet(petID, pet) {
  return axios.put("http://127.0.0.1:8000/api/Pets/" + petID + "/", {
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    gender: pet.gender,
    owner: pet.owner
  })
    .then(response => response.data)
    .catch(error => {
      console.error("Error updating pet:", error);
      throw error;
    });
}