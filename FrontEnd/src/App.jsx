import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ErrorBoundary from "./components/ui/errors/ErrorBoundary";
import ProtectedRoute from "./components/ui/Routes/ProtectRoutes.jsx";
import AuthProvider from "./context/AuthProvider";
import { DashboardDataProvider } from "./context/DashboardDataContext.jsx";
import OAuthRedirectHandler from "./components/ui/auth/OAuthRedirectHandler";

// Public pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/LoginPage";
import Register from "./pages/Auth/RegisterPage";
import AboutUs from "./pages/Others/About.jsx";
import ContactUs from "./pages/Others/Contact.jsx";

// Student pages
import Dashboard from "./pages/Student/Dashboard";
import MyCourses from "./pages/Student/MyCourses";
import MyProfile from "./pages/Student/MyProfile.jsx";
import RecommendedCourses from "./pages/Courses/Recommended.jsx";
import CourseDetails from "./components/ui/Courses/StudentCourse/CourseDetails.jsx";
import ViewCoursesPage from "./pages/Courses/ViewCourses.jsx";
import CourseModulePage from "./pages/Modules/CourseModulesPage.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";

// Instructor pages
import InstructorDashboard from "./pages/Instructor/InstructorDashboard.jsx";
import CourseWizard from "./pages/Instructor/Cousres/NewCoursePage.jsx";
import ViewCourses from "./pages/Instructor/Cousres/ViewCourses.jsx";
import CoursesPreview from "./pages/Instructor/Cousres/CoursePreview.jsx";
import EditCoursePage from "./pages/Instructor/Cousres/EditCoursePage.jsx";
import InstrcutorProfile from "./pages/Instructor/Profile/InstructoreProfile.jsx";
import InstructorViewCategories from "./pages/Categories/InstructorViewCategory.jsx";
import InstructorCategories from "./pages/Categories/InstructorCategory.jsx";
import SubmissionListPage from "./pages/Instructor/SubmissionListPage.jsx";

// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import AdminViewCategories from "./pages/Admin/Categories/AdminViewCategories.jsx";
import ViewUsers from "./pages/Admin/UsersView/ViewUsers.jsx";
import ViewUserProfilePage from "./pages/Admin/UsersView/ViewUserProfile.jsx";
import AddUsersPage from "./pages/Admin/UsersView/AddUserPage.jsx";
import ReviewPendingCoursesPages from "./pages/Admin/Courses/ReviewPendingCoursesPage.jsx";
import AdminCoursesTablePages from "./pages/Admin/Courses/AdminCoursesTablePage.jsx";
import AdminProfile from "./pages/Admin/Profile/adminProfile.jsx";
import AdminCategoriesManager from "./pages/Admin/Categories/AdminCategoriesManager.jsx";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            {/* OAuth Redirect Route */}
            <Route path="/oauth-redirect" element={<OAuthRedirectHandler />} />

            {/* Student Routes */}
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/recommended"
              element={
                <ProtectedRoute>
                  <RecommendedCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course"
              element={
                <ProtectedRoute>
                  <ViewCoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/modules"
              element={
                <ProtectedRoute>
                  <CourseModulePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lessons/:lessonId"
              element={
                <ProtectedRoute>
                  <Lessons />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/Dashboard"
              element={
                <ProtectedRoute>
                  <DashboardDataProvider>
                    <Dashboard />
                  </DashboardDataProvider>
                </ProtectedRoute>
              }
            />

            {/* Instructor Routes */}
            <Route
              path="/instructor/Dashboard"
              element={
                <ProtectedRoute>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-wizard"
              element={
                <ProtectedRoute>
                  <CourseWizard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-course/:courseId"
              element={
                <ProtectedRoute>
                  <EditCoursePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Instructor-profile"
              element={
                <ProtectedRoute>
                  <InstrcutorProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructorcourses"
              element={
                <ProtectedRoute>
                  <ViewCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <ProtectedRoute>
                  <CoursesPreview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/:courseId/assignments/:assignmentId/submissions"
              element={
                <ProtectedRoute>
                  <SubmissionListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories-instructor"
              element={
                <ProtectedRoute>
                  <InstructorViewCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories-instructor/:id"
              element={
                <ProtectedRoute>
                  <InstructorCategories />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <AdminViewCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories/manager"
              element={
                <ProtectedRoute>
                  <AdminCategoriesManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <ViewUsers />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/users/:id" element={<ViewUserProfilePage />} />
            <Route path="/admin/users/add" element={<AddUsersPage />} />
            <Route
              path="/admin/courses/pending"
              element={<ReviewPendingCoursesPages />}
            />
            <Route path="/admin/courses" element={<AdminCoursesTablePages />} />
            <Route
              path="/admin-profile"
              element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />

            

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
