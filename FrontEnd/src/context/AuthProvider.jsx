// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api"; // Your API helper

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await api.get("/auth/me", { withCredentials: true });
                if (res.data.user) setUser(res.data.user);
                else setUser(null);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
