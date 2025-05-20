import axios from "axios";
import type { RegisterForm } from "../types/user";

export const registerCustomer = (data: RegisterForm) =>
  axios.post("/api/register/customer", data);

export const registerAdmin = (data: RegisterForm) =>
  axios.post("/api/register/admin", data);

export const loginAdmin = (data: { email: string; password: string }) =>
  axios.post("/api/login/admin", data);
