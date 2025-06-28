// src/pages/Auth/GoogleCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/Auth/userAuth";

function GoogleCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    async function handleOAuth() {
      try {
        const { data } = await api.get("/auth/me");
        if (data?.user) {
          setUser(data.user);
          if (data.user.role === "student") {
            navigate("/student/dashboard");
          } else if (data.user.role === "instructor") {
            navigate("/instructor/dashboard"); // Adjust as needed
          } else {
            navigate("/admin/dashboard"); // Fallback
          }
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("OAuth failed", err);
        navigate("/login");
      }
    }

    handleOAuth();
  }, [navigate, setUser]);

  return <div>Finalizing Login...</div>;
}

export default GoogleCallback;
