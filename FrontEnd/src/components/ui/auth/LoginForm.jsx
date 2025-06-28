import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/Auth/userAuth";
import { MdErrorOutline, MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import khlogo from "../../../assets/images/khlogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const user = await login({ email, password });
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "instructor":
          navigate("/instructor/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          setError("Unknown role. Access denied.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google sign-in handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authWrapper}>
        {/* Left Side - Form */}
        <div className={styles.formSide}>
          <div className={styles.loginCard}>
            <div className={styles.logoContainer}>
              <img src={khlogo} alt="Khatwa" className={styles.logo} />
              <span className={styles.logoText}>KHATWA</span>
            </div>
            <h2 className={styles.title}>Welcome Back!</h2>
            <p className={styles.subtitle}>
              Log in to continue your learning journey
            </p>
            {error && (
              <div className={styles.error}>
                <MdErrorOutline size={18} />
                <span>{error}</span>
              </div>
            )}
            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <MdEmail className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={styles.input}
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
              <div className={styles.inputGroup}>
                <MdLock className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={styles.input}
                  required
                  minLength={6}
                  disabled={isLoading}
                  autoComplete="current-password"
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
                  <>
                    Log In
                    <span className={styles.arrow}>&rarr;</span>
                  </>
                )}
              </button>
              <div className={styles.divider}>
                <span>OR</span>
              </div>
              {/* Google Button */}
              <button
                type="button"
                className={styles.googleButton}
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <FcGoogle className={styles.googleIcon} />
                Continue with Google
              </button>
              <div className={styles.signupPrompt}>
                Don't have an account?{" "}
                <Link to="/register" className={styles.signupLink}>
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
        {/* Right Side - Visual */}
        <div className={styles.imageSide}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.welcomeTitle}>Welcome to Khatwa!</h2>
            <p className={styles.welcomeText}>
              Your journey to new skills and knowledge starts here. Log in to
              continue learning or create an account to get started.
            </p>
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureCheck}>✓</div>
                <div className={styles.featureText}>Expert-led courses</div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureCheck}>✓</div>
                <div className={styles.featureText}>Interactive learning</div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureCheck}>✓</div>
                <div className={styles.featureText}>Flexible study plans</div>
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
