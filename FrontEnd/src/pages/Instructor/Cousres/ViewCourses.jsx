import React from 'react';
import Footer from "../../../components/layout/InstructorLayout/footer";
import Header from "../../../components/layout/InstructorLayout/header";
import Sidebar from '../../../components/ui/SideBar/InstructorSideBar';
import InstructorCoursesGrid from '../../../components/ui/Courses/InstructorCourses/ViewCourses/InstructorCoursesGrid';
function ViewCourses() {

    return (
        <>
            <Header />
            <Sidebar />
            <InstructorCoursesGrid />
            <Footer />
        </>
    );
}


export default ViewCourses;
