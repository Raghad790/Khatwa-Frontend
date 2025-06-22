// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import CourseModulesPage from '../../components/ui/Modules/CourseModulesPage';

export default function CourseModulePage(){
    return (<>
                    <Header />

        <CourseModulesPage/>
                    <Footer />

    </>)

}