import React, { useState } from 'react';
import styles from './ContactUs.module.css';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
    <section className={styles.contactSection}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Let's Get In Touch!</h1>
        <p className={styles.subheading}>
          Whether you have a question, feedback, or just want to say hello, the Khatwa team would love to hear from you.
        </p>
        <div className={styles.socialRow}>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}><Facebook size={21} /></a>
          <a href="#" aria-label="Twitter" className={styles.socialIcon}><Twitter size={21} /></a>
          <a href="#" aria-label="Instagram" className={styles.socialIcon}><Instagram size={21} /></a>
          <a href="#" aria-label="LinkedIn" className={styles.socialIcon}><Linkedin size={21} /></a>
        </div>
      </div>

      <div className={styles.flexGrid}>
        {/* Left: Info Card */}
        <aside className={styles.infoCard}>
          <h2>Contact Details</h2>
          <ul className={styles.infoList}>
            <li><MapPin size={18} /> 123 KHATWA St, Amman, Jordan</li>
            <li><Mail size={18} /><a href="mailto:support@khatwa.com">support@khatwa.com</a></li>
            <li><Phone size={18} /><a href="tel:+962712345678">+962 7 1234 5678</a></li>
            <li><Clock size={18} /> <span>Sun - Thu, 9:00 AM – 5:00 PM</span></li>
          </ul>
          <div className={styles.mapEmbed}>
            <iframe
              title="Khatwa Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=35.9042%2C31.9539%2C35.9342%2C31.9739&amp;layer=mapnik"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
              allowFullScreen=""
            ></iframe>
          </div>
        </aside>

        {/* Right: Form Card */}
        <div className={styles.formCard}>
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
              autoComplete="name"
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
              autoComplete="email"
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
              autoComplete="off"
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
        </div>
      </div>
    </section>
  );
}

export default ContactUs;