import style from "./HomeHeader.module.css";
import logo from "../../../assets/images/logo2.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add search navigation logic here if needed
      // For now, just log the search
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className={style.topBar}>
        <div className={style.topBarContainer}>
          <div className={style.contactInfo}>
            <a href="tel:+18001234567" className={style.contactLink}>
              Call us: +1(800) 123 4567
            </a>
            <a href="mailto:support@khatwa.com" className={style.contactLink}>
              Email us: support@khatwa.com
            </a>
          </div>
          <div className={style.socialIcons}>
            <a href="#" className={style.socialIcon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={style.socialIcon}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={style.socialIcon}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className={style.socialIcon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.rightHeader}>
            <img className={style.img} src={logo} alt="Khatwa Logo" />
            <form onSubmit={handleSearchSubmit}>
              <input
                type="search"
                placeholder="Search courses..."
                className={style.searchCours}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          <div className={style.leftHeader}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/courses">Discover Courses</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default HomeHeader;