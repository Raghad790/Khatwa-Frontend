import styles from "./Dashboard.module.css";
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import EnrolledCourses from "../../components/ui/enrollments/EnrolledCourse";
import Sidebar from "../../components/ui/SideBar/SideBar";
import { useAuth } from "../../hooks/Auth/userAuth";
import { useDashboardData } from "../../context/useDashboardData";
import LearningTip from "../../components/ui/LearningTip/LearningTip";
import ViewCategories from "../../components/ui/Categories/ViewCategories";

function Dashboard() {
  const { user } = useAuth();
  const { enrollments } = useDashboardData();

  return (
    <>
      <Header />
      <Sidebar />

      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Welcome {user?.name || user?.role || "again"} 🎓</h1>
          <p>Here’s your learning space.</p>
        </header>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2>📚 Enrolled Courses</h2>
            <p>
              <strong>{enrollments.length}</strong> Active Courses
            </p>
          </div>
          <div className={styles.card}>
            <h2>🧠 Your Progress</h2>
            <p>
              {enrollments.length > 0
                ? `${(
                    enrollments.reduce(
                      (acc, curr) => acc + (curr.progress || 0),
                      0
                    ) / enrollments.length
                  ).toFixed(0)}% Average Completion`
                : "No progress data"}
            </p>
          </div>
          <div className={styles.card}>
            <h2>🔔 Notifications</h2>
            <p>No new alerts</p>
          </div>
        </div>
        <LearningTip />
        <EnrolledCourses />
        <ViewCategories />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
