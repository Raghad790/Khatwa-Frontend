import React, { useState } from 'react';
import styles from './Register.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../hooks/Auth/userAuth';
import { MdErrorOutline, MdPerson, MdEmail, MdLock } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";

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
    const { register } = useAuth();

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

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join our platform to get started</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        <MdErrorOutline size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className={styles.input}
                            required
                            disabled={isLoading}
                        />
                        <MdPerson className={styles.inputIcon} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className={styles.input}
                            required
                            disabled={isLoading}
                        />
                        <MdEmail className={styles.inputIcon} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className={styles.input}
                            required
                            minLength="6"
                            disabled={isLoading}
                        />
                        <MdLock className={styles.inputIcon} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className={styles.input}
                            required
                            disabled={isLoading}
                        />
                        <MdLock className={styles.inputIcon} />
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
                            'Sign Up'
                        )}
                    </button>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <button type="button" className={styles.googleButton}>
                        <FaGoogle className={styles.googleIcon} />
                        Sign up with Google
                    </button>

                    <div className={styles.loginPrompt}>
                        Already have an account? <Link to="/login" className={styles.loginLink}>Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;