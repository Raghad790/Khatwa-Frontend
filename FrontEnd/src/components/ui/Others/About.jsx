import React from "react";
import styles from "./About.module.css";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { School, Star, Groups, Verified } from "@mui/icons-material";
import heroImg from "../../../assets/images/about.png"; // Use your creative hero image here

const FEATURES = [
  {
    icon: <Star fontSize="large" className={styles.featureIcon} />,
    title: "Quality Courses",
    desc: "Curated content from industry experts and top instructors to boost your skills for the real world.",
  },
  {
    icon: <Groups fontSize="large" className={styles.featureIcon} />,
    title: "Vibrant Community",
    desc: "Connect, collaborate, and grow together with thousands of passionate learners.",
  },
  {
    icon: <School fontSize="large" className={styles.featureIcon} />,
    title: "Modern Learning",
    desc: "Interactive lessons, hands-on projects, and the latest tools for a better learning experience.",
  },
  {
    icon: <Verified fontSize="large" className={styles.featureIcon} />,
    title: "Recognized Certificates",
    desc: "Earn shareable certificates to showcase your achievements and boost your career.",
  },
];

const About = () => (
  <Box className={styles.aboutPage}>
    {/* Hero Section */}
    <section className={styles.heroSection}>
      <Container maxWidth="lg" className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <Typography className={styles.badge} component="span">
            ABOUT KHATWA
          </Typography>
          <Typography variant="h2" className={styles.heroTitle}>
            Empowering Your{" "}
            <span className={styles.gradientText}>Learning Journey</span>
          </Typography>
          <Typography className={styles.heroSubtitle}>
            Khatwa is dedicated to providing accessible, engaging, and
            high-quality online education for everyone, everywhere. <br />
            Discover your potential, unlock new skills, and join a vibrant
            community of learners and educators.
          </Typography>
        </div>
        <div className={styles.heroImgWrapper}>
          <img src={heroImg} alt="About Khatwa" className={styles.heroImg} />
        </div>
      </Container>
    </section>

    {/* Features Section */}
    <Container maxWidth="lg" className={styles.featuresSection}>
      <Grid container spacing={4}>
        {FEATURES.map((feature, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Card elevation={0} className={styles.featureCard}>
              <CardContent>
                <Box className={styles.iconCircle}>{feature.icon}</Box>
                <Typography variant="h6" className={styles.featureTitle}>
                  {feature.title}
                </Typography>
                <Typography className={styles.featureDesc}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* Mission Section */}
    <section className={styles.missionSection}>
      <Container maxWidth="md">
        <Box className={styles.missionBox}>
          <Typography variant="h4" className={styles.missionTitle}>
            Our Mission
          </Typography>
          <Typography className={styles.missionDesc}>
            We believe education should be accessible, engaging, and meaningful.
            Khatwa’s mission is to help learners and educators thrive in a
            digital world through innovative tools, expert guidance, and a
            supportive community.
          </Typography>
        </Box>
      </Container>
    </section>

    {/* Stats Section */}
    <Container maxWidth="lg" className={styles.statsSection}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={6} sm={3}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>25K+</span>
            <span className={styles.statLabel}>Active Learners</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>1.2K+</span>
            <span className={styles.statLabel}>Expert Instructors</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>1.5K+</span>
            <span className={styles.statLabel}>Courses</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>99%</span>
            <span className={styles.statLabel}>Satisfaction Rate</span>
          </div>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default About;
