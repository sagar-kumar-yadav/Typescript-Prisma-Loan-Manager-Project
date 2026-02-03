import api from "./axios";

export const loginApi = (data: {email: string; password: string}) => api.post("/auth/login", data);

export const createUserApi = (data: any) => api.post("/auth/create-user", data);

export const createAdminApi = (data: any) => api.post("/auth/create-admin", data);