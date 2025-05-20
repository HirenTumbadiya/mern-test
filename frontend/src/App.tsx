import { Routes, Route, Navigate } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register/customer" />} />
      <Route path="/register/customer" element={<CustomerRegister />} />
      <Route path="/register/admin" element={<AdminRegister />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
