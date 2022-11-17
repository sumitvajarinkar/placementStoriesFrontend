import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// const url = "http://localhost:5000/experiences";
// const url = "https://placementstoriesbackend.onrender.com/experiences";

export const fetchExperiences = () => API.get("/experiences");

export const createExperience = (newExperience) =>
  API.post("/experiences", newExperience);

export const updateExperience = (id, updatedExperience) =>
  API.patch(`/experiences/${id}`, updatedExperience);

export const deleteExperience = (id) => API.delete(`/experiences/${id}`);

export const likeExperience = (id) =>
  API.patch(`/experiences/${id}/likeExperience`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
