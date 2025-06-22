import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/RegisterPage';
import Login from './pages/auth/LoginPage';
import Dashboard from './pages/Student/Dashboard';
import './App.css';
import AuthProvider from "./context/AuthProvider";
import ErrorBoundary from './components/ui/errors/ErrorBoundary';
import Home from './pages/Home/Home';
import CourseDetails from './components/ui/Courses/StudentCourse/CourseDetails.jsx';
import MyCourses from './pages/Student/MyCourses';
import Categories from './pages/Categories/Categories';
import ViewCoursesPage from './pages/Courses/ViewCourses.jsx';
import CourseModulePage from './pages/Modules/CourseModulesPage.jsx';
import { DashboardDataProvider } from './context/DashboardDataContext.jsx';
import RecommendedCourses from './pages/Courses/Recommended.jsx';
import MyProfile from './pages/Student/MyProfile.jsx';
import SettingsPage from './pages/Settings/Settings.jsx';
import AboutUs from './pages/Others/About.jsx';
import ContactUs from "./pages/Others/Contact.jsx"
import Lessons from './pages/Lessons/Lessons.jsx';
import ViewCategories from './pages/Categories/ViewCategories.jsx';
import InstructorDashboard from "./pages/Instructor/InstructorDashboard.jsx"
import CourseWizard from './pages/Instructor/Cousres/NewCoursePage.jsx';
import ViewCourses from './pages/Instructor/Cousres/ViewCourses.jsx';
import CoursesPreview from './pages/Instructor/Cousres/CoursePreview.jsx';
import EditCoursePage from './pages/Instructor/Cousres/EditCoursePage.jsx';
import InstrcutorProfile from './pages/Instructor/Profile/InstructoreProfile.jsx';
import InstructorViewCategories from './pages/Categories/InstructorViewCategory.jsx';
import InstructorCategories from './pages/Categories/InstructorCategory.jsx';
import SubmissionListPage from "./pages/Instructor/SubmissionListPage.jsx"

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="/course" element={<ViewCoursesPage />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/Instructor-profile" element={<InstrcutorProfile />} />
            <Route path="/course/recommended" element={<RecommendedCourses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/lessons/:lessonId" element={<Lessons />} />
            <Route path="/course-wizard" element={<CourseWizard />} />
            <Route path="/edit-course/:courseId" element={<EditCoursePage />} />
            {/* <Route path="/lessons/edit/:lessonId" element={<Editlessons />} /> */}
            <Route
              path="/student/Dashboard"
              element={
                <DashboardDataProvider>
                  <Dashboard />
                </DashboardDataProvider>
              }
            />
            <Route path="/courses/:courseId/modules" element={<CourseModulePage />} />
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetails />} />

            // Add this route with your other instructor routes
            <Route
              path="/instructor/courses/:courseId/assignments/:assignmentId/submissions"
              element={<SubmissionListPage />}
            />
            <Route path="/categories" element={<ViewCategories />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/categories-instructor" element={<InstructorViewCategories />} />
            <Route path="/categories-instructor/:id" element={<InstructorCategories />} />

            <Route path="/courses/:courseId" element={<CoursesPreview />} />
            <Route path="/instructor/Dashboard" element={<InstructorDashboard />} />
            <Route path="/instructorcourses" element={<ViewCourses />} />


            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
