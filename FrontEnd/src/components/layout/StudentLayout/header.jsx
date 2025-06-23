import styles from "./header.module.css";
import logo from "../../../../src/assets/images/khlogo.png";
import { useAuth } from "../../../hooks/Auth/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import CourseSearch from "../../ui/Courses/StudentCourse/CourseSearch.jsx";
import { AppBar, Toolbar, IconButton, Avatar, Box, useMediaQuery, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const profileImg = user?.avatar || "https://i.pravatar.cc/80?img=36";

  return (
    <AppBar position="static" className={styles.headerWrapper} elevation={0}>
      <Toolbar className={styles.toolbar}>
        {/* Left: Logo & Search */}
        <Box className={styles.leftSection}>
          <Link to="/student/Dashboard" className={styles.logoLink} tabIndex={0} aria-label="Home">
            <img className={styles.logo} src={logo} alt="Khatwa Logo" />
          </Link>
          {!isMobile && (
            <div className={styles.searchBox}>
              <CourseSearch />
            </div>
          )}
        </Box>

        {/* Right: Nav & Profile */}
        <Box className={styles.rightSection}>
          {isMobile && (
            <IconButton className={styles.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}

          <nav className={isMobile ? styles.mobileNav : styles.navLinks}>
            <Link to="/student/Dashboard" className={styles.link}>Home</Link>
            <Link to="/my-courses" className={styles.link}>My Courses</Link>
            <Link to="/course" className={styles.link}>Explore Courses</Link>
            <Link to="/categories" className={styles.link}>Explore Categories</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
            <Link to="/about" className={styles.link}>About</Link>
            <Link to="/logout" className={styles.link}>Logout</Link>
          </nav>

          <Tooltip title="View Profile">
            <IconButton
              className={styles.avatarBtn}
              onClick={() => navigate("/profile")}
              size="small"
            >
              <Avatar src={profileImg} alt="Profile of student" className={styles.avatar} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;