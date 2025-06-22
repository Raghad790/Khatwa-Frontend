import React from "react";
import "./AboutEduFlex.css"; // Create this file for styling

function AboutEduFlex() {
  return (
    <>
      <div className="about-container">
        <h1 className="about-title">About EduFlex</h1>

        <section className="about-section">
          <h2>Welcome to EduFlex</h2>
          <p>
            EduFlex is a modern, flexible, and user-centric learning management
            system designed to empower learners and educators alike. Our
            platform provides seamless access to high-quality educational
            content, interactive tools, and personalized learning experiences
            that support professional and personal growth.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At EduFlex, our mission is to make learning accessible, engaging,
            and effective for everyone. We strive to connect learners with
            expertly crafted courses across various fields, fostering a
            community where knowledge meets innovation.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Diverse Course Selection:</strong> From programming and
              data science to design and business, EduFlex offers a wide range
              of courses tailored to meet diverse interests and career goals.
            </li>
            <li>
              <strong>Expert Instructors:</strong> Learn from industry
              professionals and academic experts who bring real-world experience
              and practical insights.
            </li>
            <li>
              <strong>Interactive Learning Tools:</strong> Engage with
              interactive assignments, quizzes, and collaborative projects to
              deepen your understanding.
            </li>
            <li>
              <strong>Flexible Learning:</strong> Access courses anytime,
              anywhere, and learn at your own pace on any device.
            </li>
            <li>
              <strong>Community Support:</strong> Join forums and groups to
              collaborate, discuss, and grow with fellow learners.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose EduFlex?</h2>
          <ul>
            <li>
              <strong>User-Friendly Interface:</strong> Designed for ease of
              navigation and a smooth learning experience.
            </li>
            <li>
              <strong>Personalized Recommendations:</strong> Receive course
              suggestions based on your interests and learning progress.
            </li>
            <li>
              <strong>Secure and Reliable:</strong> We prioritize your data
              privacy and platform stability.
            </li>
            <li>
              <strong>Continuous Improvement:</strong> We constantly update our
              content and features based on user feedback and educational
              trends.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Join Us</h2>
          <p>
            Whether you are a student, professional, or educator, EduFlex
            welcomes you to explore, learn, and grow. Together, let’s shape the
            future of education.
          </p>
        </section>
      </div>
    </>
  );
}

export default AboutEduFlex;
