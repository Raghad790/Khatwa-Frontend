import styles from "./footer.module.css";
import logo from "../../../../src/assets/images/khlogo.png";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerWave}></div>
            <div className={styles.footerContent}>
                <div className={styles.brandSection}>
                    <img src={logo} alt="Khatwa" className={styles.logo} />
                    <div>
                        <span className={styles.brandName}>Khatwa</span>
                        <p className={styles.tagline}>
                            Guiding Your First Step to Greatness.<br/>
                            Your modern LMS for a brighter future.
                        </p>
                    </div>
                    <div className={styles.socialRow}>
                        <a href="#" aria-label="Facebook" className={styles.socialIcon}><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" aria-label="Twitter" className={styles.socialIcon}><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram" className={styles.socialIcon}><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" aria-label="YouTube" className={styles.socialIcon}><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
                <div className={styles.linksSection}>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Explore</h4>
                        <a href="/main">Home</a>
                        <a href="/courses">Courses</a>
                        <a href="/about">About Us</a>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Support</h4>
                        <a href="/faq">FAQ</a>
                        <a href="/contact">Contact</a>
                        <a href="/feedback">Feedback</a>
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Contact</h4>
                        <div className={styles.contactRow}>
                            <i className={`fa-solid fa-location-dot ${styles.contactIcon}`}></i>
                            <span>123 Khatwa Ave, Amman, Jordan</span>
                        </div>
                        <div className={styles.contactRow}>
                            <i className={`fa-solid fa-envelope ${styles.contactIcon}`}></i>
                            <span>support@khatwa.com</span>
                        </div>
                        <div className={styles.contactRow}>
                            <i className={`fa-solid fa-phone ${styles.contactIcon}`}></i>
                            <span>+962-123-456-789</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <span>© {new Date().getFullYear()} Khatwa LMS. All rights reserved.</span>
                <div className={styles.legalLinks}>
                    <a href="/terms">Terms of Service</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/help">Help Center</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;