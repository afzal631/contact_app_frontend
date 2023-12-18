import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, setUser, user }) {
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const userRes = await axios.get(
          "https://merncontactbackend.onrender.com/user/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userRes.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user?.message !== "user found" || user == null) {
    return <Navigate to="/signup" />;
  }

  return children;
}
