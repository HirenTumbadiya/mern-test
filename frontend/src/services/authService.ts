import axios from "axios";
import type { RegisterForm } from "../types/user";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const register = (data: RegisterForm) =>
  API.post("/api/register", data);

export const login = (data: { email: string; password: string }) =>
  API.post("/api/login", data);
