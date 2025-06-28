import style from "./HomeHeader.module.css";
import logo from "../../../assets/images/logo2.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className={style.topBar}>
        <div className={style.topBarContainer}>
          <div className={style.contactInfo}>
            <a href="tel:+18001234567" className={style.contactLink}>
              <i className="fas fa-phone-alt"></i>
              <span>+1(800) 123 4567</span>
            </a>
            <a href="mailto:support@khatwa.com" className={style.contactLink}>
              <i className="fas fa-envelope"></i>
              <span>support@khatwa.com</span>
            </a>
          </div>
          <div className={style.socialIcons}>
            <a href="#" className={style.socialIcon} aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={style.socialIcon} aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={style.socialIcon} aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className={style.socialIcon} aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.rightHeader}>
            <div className={style.logoContainer}>
              <img className={style.img} src={logo} alt="Khatwa Logo" />
              <span className={style.brandName}>Khatwa</span>
            </div>
          </div>

          <div className={style.leftHeader}>
            <div
              className={`${style.navLinks} ${
                isMobileMenuOpen ? style.navLinksOpen : ""
              }`}
            >
              <Link to="/" className={style.navLink}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
              <Link to="/courses" className={style.navLink}>
                <i className="fas fa-graduation-cap"></i>
                <span>Courses</span>
              </Link>
              <Link to="/contact" className={style.navLink}>
                <i className="fas fa-phone"></i>
                <span>Contact</span>
              </Link>
            </div>

            <div className={style.authButtons}>
              <Link to="/login" className={style.loginBtn}>
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link to="/register" className={style.registerBtn}>
                <i className="fas fa-user-plus"></i>
                <span>Register</span>
              </Link>
            </div>

            <button
              className={style.mobileMenuToggle}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`${style.hamburger} ${
                  isMobileMenuOpen ? style.hamburgerOpen : ""
                }`}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`${style.mobileMenuOverlay} ${
            isMobileMenuOpen ? style.mobileMenuOverlayOpen : ""
          }`}
        >
          <div className={style.mobileMenuContent}>
            <Link
              to="/"
              className={style.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link
              to="/courses"
              className={style.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-graduation-cap"></i>
              <span>Discover Courses</span>
            </Link>
            <Link
              to="/contact"
              className={style.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-phone"></i>
              <span>Contact Us</span>
            </Link>
            <div className={style.mobileAuthButtons}>
              <Link
                to="/login"
                className={style.mobileLoginBtn}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className={style.mobileRegisterBtn}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-user-plus"></i>
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HomeHeader;
