import style from "./header.module.css";
import logo from "../../../../src/assets/images/khlogo.png";
import { useAuth } from "../../../hooks/Auth/userAuth.js";
import { Link } from "react-router-dom";
import CourseSearch from "../../ui/Courses/StudentCourse/CourseSearch.jsx";

function AdminHeader() {
    const { user } = useAuth();

    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <div className={style.rightHeader}>
                    <img
                        className={style.img}
                        src={logo}
                        alt="Khatwa Admin Logo"
                    />
                    <CourseSearch className={style.searchCours} />
                </div>
                <div className={style.leftHeader}>
                    <Link to="/admin/Dashboard">Dashboard</Link>
                    <Link to="/admin/courses">Courses</Link>
                    <Link to="/admin/categories/manager">Categories</Link>
                    <Link to="/admin/courses/pending">Pending Courses</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/logout">Logout</Link>
                    <Link to="/admin-profile">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/80?img=36"}
                            className={style.person}
                            alt="Admin Profile"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default AdminHeader;