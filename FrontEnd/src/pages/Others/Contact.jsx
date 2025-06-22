import React from 'react';
//import styles from './Main.module.css';
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import Sidebar from '../../components/ui/SideBar/SideBar';
import Contact from '../../components/ui/Others/Contact';

function ContactUs() {
    return (
        <>
            <Header />
            <Sidebar />
            <Contact />
            <Footer />
        </>
    );
}

export default ContactUs;
