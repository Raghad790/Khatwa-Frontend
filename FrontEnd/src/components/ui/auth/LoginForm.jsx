import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../hooks/Auth/userAuth';
import { MdErrorOutline, MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

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
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Please enter your credentials</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        <MdErrorOutline size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
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
                        <MdEmail className={styles.inputIcon} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type={"password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={styles.input}
                            required
                            minLength={6}
                            disabled={isLoading}
                        />
                        <MdLock className={styles.inputIcon} />

                        {/* <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </button> */}
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
    );
}

export default Login;