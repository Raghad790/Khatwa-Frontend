import React from "react";
import style from "./header.module.css";
import logo from "../../../../src/assets/images/eduflex.png";
import { useAuth } from "../../../hooks/Auth/userAuth.js"
import { Link } from "react-router-dom";
import CourseSearch from "../../ui/Courses/StudentCourse/CourseSearch.jsx";

function Header() {
    const { user } = useAuth();
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <div className={style.rightHeader}>
                    <img
                        className={style.img}
                        src={user?.avatar || logo}
                        alt="Eduflex Logo"
                    />
                    <CourseSearch />

                </div>
                <div className={style.leftHeader}>
                    <Link to="/student/Dashboard">Home</Link>
                    <Link to="/my-courses">My Courses</Link>
                    <Link to="/course">Explore Courses</Link>
                    <Link to="/categories">Explore Ctegories</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                    <Link to="/logout">Logout</Link>
                    <Link to="/profile">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/80?img=21"}
                            className={style.person}
                            alt="Profile of student"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
