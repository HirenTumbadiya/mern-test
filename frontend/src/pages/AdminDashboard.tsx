import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName") || "";
    const storedLastName = localStorage.getItem("lastName") || "";
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Welcome to the Admin Dashboard</h1>
      <p className="text-lg text-gray-700">
        Hello, <span className="font-semibold">{firstName} {lastName}</span>! You are logged in as an admin.
      </p>
    </div>
  );
};

export default AdminDashboard;
