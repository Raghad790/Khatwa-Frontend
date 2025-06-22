import React from 'react';
import Footer from "../../../components/layout/InstructorLayout/footer";
import Header from "../../../components/layout/InstructorLayout/header";
import Sidebar from '../../../components/ui/SideBar/InstructorSideBar';
import CourseWizard from "../../../components/ui/Courses/InstructorCourses/CreateCourse/CourseWizard"
function NewCoursePage() {

    return (
        <>
            <Header />
            <Sidebar />
            <CourseWizard />
            <Footer />
        </>
    );
}


export default NewCoursePage;
