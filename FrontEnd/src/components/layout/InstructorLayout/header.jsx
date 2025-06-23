import React from "react";
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
        <Box className={styles.leftSection}>
          <Link to="/instructor/Dashboard" className={styles.logoLink} tabIndex={0} aria-label="Home">
            <img className={styles.logo} src={logo} alt="Khatwa Logo" />
          </Link>
          {!isMobile && (
            <div className={styles.searchBox}>
              <CourseSearch />
            </div>
          )}
        </Box>

        <Box className={styles.rightSection}>
          {isMobile && (
            <IconButton className={styles.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}

          <nav className={isMobile ? styles.mobileNav : styles.navLinks}>
            <Link to="/instructor/Dashboard" className={styles.link}>Home</Link>
            <Link to="/instructorcourses" className={styles.link}>My Courses</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
            <Link to="/logout" className={styles.link}>Logout</Link>
          </nav>

          <Tooltip title="View Profile">
            <IconButton
              className={styles.avatarBtn}
              onClick={() => navigate("/Instructor-profile")}
              size="small"
            >
              <Avatar src={profileImg} alt="Profile of instructor" className={styles.avatar} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;