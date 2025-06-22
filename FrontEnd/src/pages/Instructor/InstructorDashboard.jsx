import React from "react";
import styles from "./InstructorDashboard.module.css";
import Footer from "../../components/layout/InstructorLayout/footer";
import Header from "../../components/layout/InstructorLayout/header";
import Sidebar from "../../components/ui/SideBar/InstructorSideBar";
import { useAuth } from "../../hooks/Auth/userAuth";
import QuoteOfTheDay from "../../components/ui/QuoteOfTheDay/QuoteOfTheDay";
import SimpleTodo from "../../components/ui/SimpleTodo/SimpleTodo";
import ViewCategories from "../../components/ui/Categories/ViewCategories";
import EnrollmentReports from "../../components/ui/Courses/InstructorCourses/AnalsysCourses/ProgressChart";

const InstructorDashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <Header />
            <Sidebar />
            <div className={styles.dashboard}>
                <header className={styles.header}>
                    <h1>Welcome {user?.name || user?.role || "again"} 🎓</h1>
                    <p>Here’s your teaching space.</p>
                </header>
                <QuoteOfTheDay />
                <EnrollmentReports />
                <ViewCategories />
                <SimpleTodo />
            </div>
            <Footer />
        </>
    );
}

export default InstructorDashboard;
