import { useState, useEffect } from "react";
import { DashboardDataContext } from "./DashboardDataContext.js";
import api from "../services/api";

export const DashboardDataProvider = ({ children }) => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/enrollments/my-courses", {
          withCredentials: true,
        });
        setEnrollments(res.data.result || []);
      } catch (err) {
        console.error("Failed to load enrollments", err);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <DashboardDataContext.Provider value={{ enrollments }}>
      {children}
    </DashboardDataContext.Provider>
  );
};
