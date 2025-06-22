import React from 'react';
import Footer from "../../../components/layout/InstructorLayout/footer";
import Header from "../../../components/layout/InstructorLayout/header";
import Sidebar from '../../../components/ui/SideBar/InstructorSideBar';
import CoursePreview from "../../../components/ui/Courses/InstructorCourses/ViewCourses/CoursePreview"
function CoursesPreview() {

    return (
        <>
            <Header />
            <Sidebar />
            <CoursePreview />
            <Footer />
        </>
    );
}


export default CoursesPreview;
