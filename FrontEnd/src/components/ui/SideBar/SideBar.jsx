import React, { useState, useEffect } from 'react';
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
} from 'react-icons/md';
import { useAuth } from '../../../hooks/Auth/userAuth';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const menuItems = [
        { title: 'Dashboard', icon: <MdDashboard />, path: '/student/Dashboard' },
        {
            title: 'My Courses',
            icon: <MdLibraryBooks />,
            path: '/my-courses',
            subItems: [
                { title: 'Enrolled', path: '/my-courses' },
                { title: 'Recommended', path: '/course/recommended' },
                { title: 'Explore', path: '/course' },
            ],
        },
        { title: 'Categories', icon: <MdPeople />, path: '/categories' },
        { title: 'Profile', icon: <MdPerson />, path: '/profile' },
        { title: 'Settings', icon: <MdSettings />, path: '/settings' },
    ];

    const toggleSubmenu = (title) => {
        setOpenSubmenu(openSubmenu === title ? null : title);
    };

    const isActive = (path) => location.pathname === path;

    // Hide scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Toggle always visible */}
            {!isOpen && (
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open sidebar"
                >
                    <MdMenu />
                </button>
            )}

            {/* Overlay for full screen when sidebar is open */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                    aria-label="Close sidebar overlay"
                />
            )}

            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                aria-label="Sidebar navigation"
            >
                {/* Close button always visible inside sidebar */}
                <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpen(false)}
                    aria-label="Close sidebar"
                >
                    <MdClose />
                </button>

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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubmenu(title);
                                            }}
                                            className={styles.expandBtn}
                                            aria-label={`${openSubmenu === title ? 'Collapse' : 'Expand'} submenu for ${title}`}
                                            tabIndex={0}
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