import { useState } from 'react';
import styles from './Register.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../hooks/Auth/userAuth';
import { MdErrorOutline, MdPerson, MdEmail, MdLock } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import khlogo from '../../../assets/images/khlogo.png';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, registerWithGoogle } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/student/Dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Google register handler (optional: wire to your OAuth logic)
    const handleGoogleRegister = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setError('');
        try {
            await registerWithGoogle();
            navigate('/student/Dashboard');
        } catch (err) {
            setError(err.message || 'Google signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.authWrapper}>
                {/* Left Visual Side */}
                <div className={styles.visualSide}>
                    <div className={styles.visualContent}>
                        <h1 className={styles.visualTitle}>Join Khatwa Today!</h1>
                        <p className={styles.visualSubtitle}>
                            Create an account to start your learning journey with us. Access our library of courses and expand your knowledge.
                        </p>
                        <ul className={styles.visualFeatures}>
                            <li>
                                <span className={styles.checkMark}>✓</span>
                                Free account creation
                            </li>
                            <li>
                                <span className={styles.checkMark}>✓</span>
                                Access to premium courses
                            </li>
                            <li>
                                <span className={styles.checkMark}>✓</span>
                                Track your learning progress
                            </li>
                        </ul>
                    </div>
                    <div className={styles.shapesContainer}>
                        <div className={styles.shape1}></div>
                        <div className={styles.shape2}></div>
                    </div>
                </div>

                {/* Right Form Side */}
                <div className={styles.formSide}>
                    <div className={styles.logoContainer}>
                        <img src={khlogo} alt="Khatwa" className={styles.logo} />
                        <h3 className={styles.logoText}>Khatwa</h3>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Create Your Account</h1>
                            <p className={styles.subtitle}>Sign up in seconds to start learning</p>
                        </div>
                        {error && (
                            <div className={styles.error}>
                                <MdErrorOutline size={18} />
                                <span>{error}</span>
                            </div>
                        )}
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <MdPerson className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={styles.input}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <MdEmail className={styles.inputIcon} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className={styles.input}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <MdLock className={styles.inputIcon} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={styles.input}
                                    required
                                    minLength="6"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <MdLock className={styles.inputIcon} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={styles.input}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            {/* Terms and Conditions */}
                            <div className={styles.termsRow}>
                                <input type="checkbox" required id="terms" className={styles.termsCheckbox} />
                                <label htmlFor="terms" className={styles.termsLabel}>
                                    I agree to the <Link to="/terms" className={styles.termsLink}>terms & conditions</Link>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className={styles.loading}>
                                        <span className={styles.spinner}></span>
                                        Creating account...
                                    </span>
                                ) : (
                                    <>
                                        Create Account
                                        <span className={styles.arrow}>&rarr;</span>
                                    </>
                                )}
                            </button>
                            <div className={styles.divider}>
                                <span>OR</span>
                            </div>
                            <button
                                type="button"
                                className={styles.googleButton}
                                onClick={handleGoogleRegister}
                                disabled={isLoading}
                            >
                                <FaGoogle className={styles.googleIcon} />
                                Sign up with Google
                            </button>
                            <div className={styles.loginPrompt}>
                                Already have an account? <Link to="/login" className={styles.loginLink}>Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;