import React, { useState } from 'react';
import './ContactUs.css'; // Create this for styling

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
            // Reset form or keep data as you prefer
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>

            <p className="contact-intro">
                Have questions, suggestions, or want to get in touch? Fill out the form below and
                our team will respond as soon as possible.
            </p>

            {submitted && (
                <div className="success-message">
                    Thank you for reaching out! We will get back to you shortly.
                </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="name">Name<span className="required">*</span></label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                    placeholder="Your full name"
                />
                {errors.name && <p className="error-text">{errors.name}</p>}

                <label htmlFor="email">Email<span className="required">*</span></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                    placeholder="your.email@example.com"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <label htmlFor="subject">Subject<span className="required">*</span></label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'input-error' : ''}
                    placeholder="Subject of your message"
                />
                {errors.subject && <p className="error-text">{errors.subject}</p>}

                <label htmlFor="message">Message<span className="required">*</span></label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    placeholder="Write your message here..."
                    rows="6"
                />
                {errors.message && <p className="error-text">{errors.message}</p>}

                <button type="submit" className="btn-submit">Send Message</button>
            </form>

            <div className="contact-info">
                <h2>Our Contact Information</h2>
                <p><strong>Address:</strong> 123 EduFlex St, Amman, Jordan</p>
                <p><strong>Email:</strong> support@eduflex.com</p>
                <p><strong>Phone:</strong> +962 7 1234 5678</p>
                <p><strong>Working Hours:</strong> Sunday - Thursday, 9 AM - 5 PM</p>
            </div>
        </div>
    );
}

export default ContactUs;
