import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdLibraryBooks,
  MdCategory,
  MdSettings,
  MdExitToApp,
  MdPerson,
  MdSupervisedUserCircle,
  MdBarChart,
  MdMenu,
  MdClose
} from 'react-icons/md';
import { useAuth } from '../../../hooks/Auth/userAuth';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: <MdDashboard />, path: '/admin/dashboard' },
    { title: 'Manage Users', icon: <MdSupervisedUserCircle />, path: '/admin/users' },
    { title: 'Courses', icon: <MdLibraryBooks />, path: '/admin/courses' },
    { title: 'Categories', icon: <MdCategory />, path: '/admin/categories' },
    { title: 'MManage Categories', icon: <MdCategory />, path: '/admin/categories/manager' },
    { title: 'Profile', icon: <MdPerson />, path: '/admin-profile' },
    { title: 'Settings', icon: <MdSettings />, path: '/settings' },
  ];

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

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Admin sidebar">
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h3 className={styles.profileName}>{user?.name || 'Admin'}</h3>
            <p className={styles.profileRole}>Administrator</p>
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
                  <span className={styles.menuText}>{title}</span>
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
          <MdExitToApp size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;