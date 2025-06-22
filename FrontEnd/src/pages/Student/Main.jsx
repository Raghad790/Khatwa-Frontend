import React from 'react';
//import styles from './Main.module.css';
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import TextRotator from "../../components/ui/TextRotator/TextRotator";
import CourseCards from '../../components/ui/Courses/StudentCourse/ViewCourses';
import Sidebar from '../../components/ui/SideBar/SideBar';

function MainStudent() {
    return (
        <>
            <Header />
            <Sidebar />
            <TextRotator />
            <CourseCards />
            <Footer />
        </>
    );
}

export default MainStudent;
