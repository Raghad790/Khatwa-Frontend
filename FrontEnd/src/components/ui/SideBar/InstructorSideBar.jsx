import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    MdDashboard,
    MdLibraryBooks,
    MdPeople,
    MdSettings,
    MdExpandMore,
    MdExpandLess,
    MdExitToApp,
    MdMenu,
    MdClose,
    MdPerson,
    MdBook,
    MdCategory,
} from 'react-icons/md';
import { useAuth } from '../../../hooks/Auth/userAuth';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const menuItems = [
        { title: 'Dashboard', icon: <MdDashboard />, path: '/instructor/Dashboard' },
        // {
        //     title: 'My Courses',
        //     icon: <MdLibraryBooks />,
        //     path: '/instructorcourses',
        //     subItems: [
        //         { title: 'My Courses', path: '/instructorcourses' },
        //         { title: '', path: '/course' },
        //     ],
        // },
        { title: 'My Courses', icon: <MdLibraryBooks />, path: '/instructorcourses' },
        { title: 'Add Course', icon: <MdBook />, path: '/course-wizard' },
        { title: 'Categories', icon: <MdCategory />, path: '/categories-instructor' },
        { title: 'Profile', icon: <MdPerson />, path: '/Instructor-profile' },
        { title: 'Settings', icon: <MdSettings />, path: '/settings' },
    ];

    const toggleSubmenu = (title) => {
        setOpenSubmenu(openSubmenu === title ? null : title);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                aria-label="Sidebar navigation"
            >
                <div className={styles.profile}>
                    <div className={styles.avatar} aria-hidden="true">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h3 tabIndex={0}>{user?.name || 'User'}</h3>
                        <p>{user?.role || 'Student'}</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <ul>
                        {menuItems.map(({ title, icon, path, subItems }) => (
                            <li key={title}>
                                <div
                                    className={`${styles.menuItem} ${isActive(path) ? styles.active : ''}`}
                                    onClick={() => (subItems ? toggleSubmenu(title) : setIsOpen(false))}
                                    role={subItems ? 'button' : undefined}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            subItems ? toggleSubmenu(title) : setIsOpen(false);
                                        }
                                    }}
                                >
                                    <Link
                                        to={path}
                                        className={styles.link}
                                        onClick={() => !subItems && setIsOpen(false)}
                                    >
                                        <span className={styles.icon}>{icon}</span>
                                        <span>{title}</span>
                                    </Link>
                                    {subItems && (
                                        <button
                                            onClick={() => toggleSubmenu(title)}
                                            className={styles.expandBtn}
                                            aria-label={`${openSubmenu === title ? 'Collapse' : 'Expand'} submenu for ${title}`}
                                        >
                                            {openSubmenu === title ? <MdExpandLess /> : <MdExpandMore />}
                                        </button>
                                    )}
                                </div>

                                {subItems && openSubmenu === title && (
                                    <ul className={styles.subMenu}>
                                        {subItems.map(({ title: subTitle, path: subPath }) => (
                                            <li key={subTitle}>
                                                <Link
                                                    to={subPath}
                                                    className={`${styles.subMenuItem} ${isActive(subPath) ? styles.activeSub : ''}`}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subTitle}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    className={styles.logout}
                    onClick={() => {
                        logout();
                        setIsOpen(false);
                    }}
                    aria-label="Logout"
                >
                    <MdExitToApp />
                    <span>Logout</span>
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
