import styles from "./Dashboard.module.css";
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import EnrolledCourses from "../../components/ui/enrollments/EnrolledCourse";
import Sidebar from "../../components/ui/SideBar/SideBar";
import { useAuth } from "../../hooks/Auth/userAuth";
import { useDashboardData } from "../../context/useDashboardData";
import LearningTip from "../../components/ui/LearningTip/LearningTip";
import ViewCategories from "../../components/ui/Categories/ViewCategories";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

function Dashboard() {
  const { user } = useAuth();
  const { enrollments } = useDashboardData();

  // Modern, creative layout, inspired by Edudeme
  return (
    <>
      <Header />
      <Sidebar />
      <main className={styles.dashboard}>
        <header className={styles.hero}>
          <div>
            <h1>
              Welcome <span className={styles.username}>{user?.name || user?.role || "again"}</span> <span role="img" aria-label="graduation">🎓</span>
            </h1>
            <p className={styles.subtitle}>Your personalized learning journey starts here!</p>
          </div>
          <img
            src="/assets/illustrations/dashboard-hero.svg"
            className={styles.heroImg}
            alt=""
            loading="lazy"
            aria-hidden
          />
        </header>

        <section className={styles.cardsRow}>
          <div className={styles.card + " " + styles.gradientCard}>
            <SchoolRoundedIcon className={styles.cardIcon} />
            <h2>Enrolled Courses</h2>
            <p>
              <strong>{enrollments.length}</strong> Active
            </p>
          </div>
          <div className={styles.card + " " + styles.glassCard}>
            <TrendingUpRoundedIcon className={styles.cardIcon} />
            <h2>Your Progress</h2>
            <p>
              {enrollments.length > 0
                ? `${(
                    enrollments.reduce(
                      (acc, curr) => acc + (curr.progress || 0),
                      0
                    ) / enrollments.length
                  ).toFixed(0)}% Avg. Completion`
                : "No progress yet"}
            </p>
          </div>
        </section>

        <LearningTip />
        <section className={styles.coursesSection}>
          <EnrolledCourses />
        </section>
        <section className={styles.categoriesSection}>
          <ViewCategories />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;