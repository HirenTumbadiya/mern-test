import { Routes, Route, Navigate } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register/customer" />} />
      <Route path="/register/customer" element={<CustomerRegister />} />
      <Route path="/register/admin" element={<AdminRegister />} />
      <Route path="/login/admin" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
