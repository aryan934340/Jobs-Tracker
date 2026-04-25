import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode, toggleSidebar } from '../features/ui/uiSlice'
import { openAddModal } from '../features/ui/uiSlice'
import JobModal from './JobModal'
import styles from './Layout.module.css'

const NAV = [
  { to: '/dashboard',    label: 'Dashboard',     icon: '⬡' },
  { to: '/applications', label: 'Applications',  icon: '◈' },
  { to: '/analytics',    label: 'Analytics',     icon: '◎' },
  { to: '/notes',        label: 'Notes',         icon: '◇' },
]

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const darkMode = useSelector(s => s.ui.darkMode)
  const sidebarOpen = useSelector(s => s.ui.sidebarOpen)
  const modalOpen = useSelector(s => s.ui.modalOpen)

  return (
    <div className={`${styles.root} ${darkMode ? styles.dark : styles.light}`}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          {sidebarOpen && <span className={styles.logoText}>JobTrackr</span>}
        </div>

        <nav className={styles.nav}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ''}`
              }
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span className={styles.navLabel}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <button
            className={styles.themeBtn}
            onClick={() => dispatch(toggleDarkMode())}
            title="Toggle theme"
          >
            <span>{darkMode ? '☀' : '☾'}</span>
            {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => dispatch(toggleSidebar())}
          >
            ☰
          </button>
          <div className={styles.topbarTitle}>Career Pipeline</div>
          <button
            className={styles.addBtn}
            onClick={() => dispatch(openAddModal())}
          >
            + Add Job
          </button>
        </header>

        {/* Page content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>

      {/* Global Modal */}
      {modalOpen && <JobModal />}
    </div>
  )
}
