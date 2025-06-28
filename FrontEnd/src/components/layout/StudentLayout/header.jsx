import React, { useState } from "react";
import styles from "./header.module.css";
import logo from "../../../assets/images/khlogo.png";
import { useAuth } from "../../../hooks/Auth/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import CourseSearch from "../../ui/Courses/StudentCourse/CourseSearch.jsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const profileImg = user?.avatar || "https://i.pravatar.cc/80?img=36";

  const navLinks = [
    { to: "/student/Dashboard", label: "Home" },
    { to: "/my-courses", label: "My Courses" },
    { to: "/course", label: "Explore Courses" },
    { to: "/categories", label: "Explore Categories" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <AppBar
      position="static"
      className={styles.headerWrapper}
      elevation={0}
      color="transparent"
    >
      <Toolbar className={styles.toolbar}>
        {/* Left: Logo and Search */}
        <div className={styles.leftSection}>
          <Link
            to="/student/Dashboard"
            className={styles.logoLink}
            tabIndex={0}
            aria-label="Home"
          >
            <img className={styles.logo} src={logo} alt="Khatwa Logo" />
          </Link>
          {!isMobile && (
            <div className={styles.searchBox}>
              <CourseSearch />
            </div>
          )}
        </div>

        {/* Right: Nav and Profile */}
        <div className={styles.rightSection}>
          {isMobile ? (
            <>
              <IconButton
                className={styles.menuButton}
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                  sx: {
                    background:
                      "linear-gradient(135deg, #e0d6ff 0%, #ffe6f4 100%)",
                    borderTopLeftRadius: "2rem",
                    borderBottomLeftRadius: "2rem",
                  },
                }}
              >
                <Box
                  sx={{ minWidth: 220, padding: "1.2rem 1rem 1rem 1rem" }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Tooltip title="View Profile">
                      <IconButton
                        className={styles.avatarBtn}
                        onClick={() => navigate("/profile")}
                        size="small"
                        sx={{ ml: 0.5 }}
                      >
                        <Avatar
                          src={profileImg}
                          alt="Profile of student"
                          className={styles.avatar}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <List>
                    {navLinks.map((link) => (
                      <ListItem key={link.to} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={link.to}
                          className={styles.drawerLink}
                        >
                          <ListItemText primary={link.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <nav className={styles.navLinks}>
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Tooltip title="View Profile">
                <IconButton
                  className={styles.avatarBtn}
                  onClick={() => navigate("/profile")}
                  size="small"
                >
                  <Avatar
                    src={profileImg}
                    alt="Profile of student"
                    className={styles.avatar}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;