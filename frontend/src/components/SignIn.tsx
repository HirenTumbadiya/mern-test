import { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import type { SignUpProps } from "../types/props";
import type { LoginForm } from "../types/user";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function SignIn({ role }: SignUpProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "email":
        if (!value.trim()) errorMessage = "Email is required";
        else if (!validateEmail(value))
          errorMessage = "Please enter a valid email address";
        break;
      case "password":
        if (!value) errorMessage = "Password is required";
        else if (!validatePassword(value))
          errorMessage = "Password must be at least 8 characters";
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });

    // Clear success/error message when form is being edited
    if (submitMessage.text) {
      setSubmitMessage({ type: "", text: "" });
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) e.preventDefault();
    // console.log(role);

    // Validate all fields before submission
    const newErrors: LoginForm = {
      email: "",
      password: "",
    };
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(
        key,
        formData[key as keyof typeof formData]
      );
      newErrors[key as keyof typeof formData] = errorMessage;
      if (errorMessage) hasErrors = true;
    });

    setErrors(newErrors);

    if (hasErrors) {
      setSubmitMessage({
        type: "error",
        text: "Please fix the errors in the form",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: role,
      };
      const response = await login(payload);

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        setSubmitMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/dashboard/admin");
        }, 100);
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage({
        type: "error",
        text: "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {submitMessage.text && (
              <div
                className={`mb-6 p-3 flex items-start rounded ${
                  submitMessage.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {submitMessage.type === "success" ? (
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <span>{submitMessage.text}</span>
              </div>
            )}

            <div role="form">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4"></div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 rounded-lg text-black border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 text-black rounded-lg border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="flex items-center justify-between gap-5">
                <button
                  onClick={() => navigate("/register/admin")}
                  className={`mt-6 w-full flex justify-center items-center py-3 px-4 border border-black rounded-lg shadow-sm text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium
                }`}
                >
                  Admin Signup
                </button>
                <button
                  onClick={() => navigate("/register/customer")}
                  className={`mt-6 w-full flex justify-center items-center py-3 px-4 border border-black rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium
                }`}
                >
                  Customer Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
