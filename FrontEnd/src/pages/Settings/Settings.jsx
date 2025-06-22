import React from 'react';
//import styles from './Main.module.css';
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import Sidebar from '../../components/ui/SideBar/SideBar';
import Settings from '../../components/ui/Settings/Settings';

function SettingsPage() {
    return (
        <>
            <Header />
            <Sidebar />
            <Settings />
            <Footer />
        </>
    );
}

export default SettingsPage;
