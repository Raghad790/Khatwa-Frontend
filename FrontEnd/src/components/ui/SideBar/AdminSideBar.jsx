import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    MdDashboard,
    MdLibraryBooks,
    MdSettings,
    MdExitToApp,
    MdMenu,
    MdClose,
    MdPerson,
    MdBook,
    MdCategory,
} from 'react-icons/md';
import { useAuth } from '../../../hooks/Auth/userAuth';
import styles from './Sidebar.module.css';

const AdminSidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { title: 'Dashboard', icon: <MdDashboard />, path: '/admin/dashboard' },
        { title: 'Manage Users', icon: <MdLibraryBooks />, path: '/admin/users' },
        { title: 'Courses', icon: <MdBook />, path: '/admin/courses' },
        { title: 'Categories', icon: <MdCategory />, path: '/admin/categories' },
        { title: 'Manage Categories', icon: <MdCategory />, path: '/admin/categories/manager' },
        { title: 'Profile', icon: <MdPerson />, path: '/admin-profile' },
        { title: 'Settings', icon: <MdSettings />, path: '/settings' },
    ];

    const isActive = (path) => location.pathname === path;

    // Overlay for mobile/tablet, closes sidebar
    const SidebarOverlay = () =>
        <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
        />;

    return (
        <>
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            {isOpen && <SidebarOverlay />}

            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                aria-label="Sidebar navigation"
            >
                <div className={styles.profile}>
                    <div className={styles.avatar} aria-hidden="true">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                        <h3 tabIndex={0}>{user?.name || 'Admin'}</h3>
                        <p>Administrator</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <ul>
                        {menuItems.map(({ title, icon, path }) => (
                            <li key={title}>
                                <Link
                                    to={path}
                                    className={`${styles.menuItem} ${isActive(path) ? styles.active : ''}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className={styles.icon}>{icon}</span>
                                    <span>{title}</span>
                                </Link>
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

export default AdminSidebar;