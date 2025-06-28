import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/Auth/userAuth";
import api from "../../../services/api";
import styles from "./OAuthRedirectHandler.module.css";

const OAuthRedirectHandler = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await api.get("/auth/me");
        console.log("🟢 /auth/me response:", res.data);

        if (res?.data?.user) {
          setUser(res.data.user);
          const role = res.data.user.role;
          console.log("🟢 Detected role:", role);

          // ✅ Wait for setUser to complete (just a tiny delay)
          setTimeout(() => {
            if (role === "student") navigate("/student/Dashboard");
            else if (role === "admin") navigate("/admin/dashboard");
            else if (role === "instructor") navigate("/instructor/Dashboard");
            else navigate("/");
          }, 200); // increase to 200ms for safer race condition buffer
        } else {
          console.log("❌ No user found in /auth/me");
          navigate("/unauthorized");
        }
      } catch (err) {
        console.error("❌ Error during OAuth callback:", err);
        navigate("/login");
      }
    };

    restoreUser();
  }, [setUser, navigate]);

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>Logging you in with Google...</p>
    </div>
  );
};

export default OAuthRedirectHandler;
