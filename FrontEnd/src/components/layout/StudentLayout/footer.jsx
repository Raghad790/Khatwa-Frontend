import React from "react";
import styles from "./footer.module.css";
import logo from "../../../../src/assets/images/eduflex.png";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <img src={logo} alt="Eduflex" className={styles.logo} />
                    <p className={styles.motto}>Learn it. Live it. Love it.</p>
                </div>

                <div className={styles.menu}>
                    <h3>Explore</h3>
                    <a href="/main">Home</a>
                    <a href="/courses">Courses</a>
                    <a href="/about">About Us</a>
                </div>

                <div className={styles.menu}>
                    <h3>Support</h3>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                    <a href="/feedback">Feedback</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>

                <div className={styles.social}>
                    <h3>Stay Connected</h3>
                    <div className={styles.icons}>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">YouTube</a>
                    </div>
                </div>
            </div>

            <div className={styles.copy}>
                &copy; {new Date().getFullYear()} Eduflex — All rights reserved
            </div>
        </footer>
    );
}

export default Footer;
