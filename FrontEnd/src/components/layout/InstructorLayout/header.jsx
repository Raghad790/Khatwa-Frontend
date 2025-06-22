import React from "react";
import style from "./header.module.css";
import logo from "../../../../src/assets/images/eduflex.png";
import {useAuth} from "../../../hooks/Auth/userAuth.js"
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
                    <Link to="/instructor/Dashboard">Home</Link>
                    <Link to="/instructorcourses">My Courses</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/logout">Logout</Link>
                    <Link to="/Instructor-profile">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/80?img=21"}
                            className={style.person}
                            alt="Profile of instructor"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
