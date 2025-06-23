import React, { useState } from 'react';
import styles from './ContactUs.module.css';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Normally here you'd send data to the server
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    return (
        <div className={styles.contactContainer}>
            <h1 className={styles.heading}>Contact Us</h1>

            <p className={styles.contactIntro}>
                Have questions, suggestions, or want to get in touch? Fill out the form below and
                our team will respond as soon as possible.
            </p>

            {submitted && (
                <div className={styles.successMessage}>
                    Thank you for reaching out! We will get back to you shortly.
                </div>
            )}

            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                <label htmlFor="name">
                    Name<span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.inputError : ''}
                    placeholder="Your full name"
                />
                {errors.name && <p className={styles.errorText}>{errors.name}</p>}

                <label htmlFor="email">
                    Email<span className={styles.required}>*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.inputError : ''}
                    placeholder="your.email@example.com"
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}

                <label htmlFor="subject">
                    Subject<span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? styles.inputError : ''}
                    placeholder="Subject of your message"
                />
                {errors.subject && <p className={styles.errorText}>{errors.subject}</p>}

                <label htmlFor="message">
                    Message<span className={styles.required}>*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? styles.inputError : ''}
                    placeholder="Write your message here..."
                    rows="6"
                />
                {errors.message && <p className={styles.errorText}>{errors.message}</p>}

                <button type="submit" className={styles.btnSubmit}>Send Message</button>
            </form>

            <div className={styles.contactInfo}>
                <h2>Our Contact Information</h2>
                <p><strong>Address:</strong> 123 KHATWA St, Amman, Jordan</p>
                <p><strong>Email:</strong> support@khatwa.com</p>
                <p><strong>Phone:</strong> +962 7 1234 5678</p>
                <p><strong>Working Hours:</strong> Sunday - Thursday, 9 AM - 5 PM</p>
            </div>
        </div>
    );
}

export default ContactUs;