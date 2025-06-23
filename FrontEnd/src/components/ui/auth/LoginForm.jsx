import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../hooks/Auth/userAuth';
import { MdErrorOutline, MdEmail, MdLock } from "react-icons/md";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const user = await login({ email, password });

            switch (user.role) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'instructor':
                    navigate('/instructor/dashboard');
                    break;
                case 'student':
                    navigate('/student/dashboard');
                    break;
                default:
                    setError('Unknown role. Access denied.');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.authWrapper}>
                {/* Left Side - Form */}
                <div className={styles.formSide}>
                    <div className={styles.logoContainer}>
                        <img src="/khlogo.png" alt="Khatwa" className={styles.logo} />
                        <h3 className={styles.logoText}>KHATWA</h3>
                    </div>
                    <div className={styles.loginCard}>
                        <h2 className={styles.title}>Welcome Back</h2>
                        <p className={styles.subtitle}>Please enter your credentials</p>
                        {error && (
                            <div className={styles.error}>
                                <MdErrorOutline size={18} />
                                <span>{error}</span>
                            </div>
                        )}
                        <form className={styles.form} onSubmit={handleLogin}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    <MdEmail size={18} />
                                    <span>Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className={styles.input}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    <MdLock size={18} />
                                    <span>Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className={styles.input}
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className={styles.loading}>
                                        <span className={styles.spinner}></span>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                            <div className={styles.signupPrompt}>
                                Don't have an account? <Link to="/register" className={styles.signupLink}>Sign up</Link>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Right Side - Visual */}
                <div className={styles.imageSide}>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.welcomeTitle}>Find Your Perfect Courses & Improve Your Skills</h2>
                        <p className={styles.welcomeText}>
                            Make your learning count. Get unlimited and instant access to online courses from top instructors.
                        </p>
                        <div className={styles.features}>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>★</div>
                                <div className={styles.featureText}>Rated 4.9/5 by students</div>
                            </div>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>✓</div>
                                <div className={styles.featureText}>Expert instructors</div>
                            </div>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>✓</div>
                                <div className={styles.featureText}>Modern interactive platform</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.shapesContainer}>
                        <div className={styles.shape1}></div>
                        <div className={styles.shape2}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;