export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}