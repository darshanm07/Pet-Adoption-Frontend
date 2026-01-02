import api from "./axiosConfig";

export const applicationAPI = {
  createApplication: (applicationData) =>
    api.post("/applications", applicationData),
  getUserApplications: () => api.get("/applications/my-applications"),
  getAllApplications: (status) =>
    api.get("/applications", { params: { status } }),
  updateApplicationStatus: (id, statusData) =>
    api.patch(`/applications/${id}/status`, statusData),
};
