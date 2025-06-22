import React from 'react';
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import Sidebar from '../../components/ui/SideBar/SideBar';
import LessonPage from '../../components/ui/Lessons/LessonPage';

function Lessons() {
    return (
        <>
            <Header />
            <Sidebar />
            <LessonPage />
            <Footer />
        </>
    );
}

export default Lessons;
