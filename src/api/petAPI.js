import api from "./axiosConfig";

export const petAPI = {
  getAllPets: (params) => api.get("/pets", { params }),
  getPetById: (id) => api.get(`/pets/${id}`),
  createPet: (petData) => api.post("/pets", petData),
  updatePet: (id, petData) => api.put(`/pets/${id}`, petData),
  uploadImage: (imageData) =>
    api.post("/pets/upload", imageData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type for file upload
      },
    }),
  deletePet: (id) => api.delete(`/pets/${id}`),
};
