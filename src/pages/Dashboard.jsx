import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllJobs, selectStats } from '../features/jobs/jobsSlice'
import { openEditModal, openAddModal } from '../features/ui/uiSlice'
import StatsBar from '../components/StatsBar'
import StatusBadge from '../components/StatusBadge'
import styles from './Dashboard.module.css'

const RecentRow = memo(({ job, onEdit }) => (
  <div className={styles.recentRow} onClick={() => onEdit(job)}>
    <div className={styles.recentLeft}>
      <div className={styles.companyAvatar}>
        {job.company[0].toUpperCase()}
      </div>
      <div>
        <div className={styles.recentCompany}>{job.company}</div>
        <div className={styles.recentRole}>{job.role}</div>
      </div>
    </div>
    <div className={styles.recentRight}>
      <StatusBadge status={job.status} size="sm" />
      <span className={styles.recentDate}>{job.date || '—'}</span>
    </div>
  </div>
))

export default function Dashboard() {
  const dispatch = useDispatch()
  const jobs = useSelector(selectAllJobs)
  const stats = useSelector(selectStats)
  const recent = jobs.slice(0, 6)

  const rate = stats.total
    ? Math.round(((stats.Interview + stats.Offer) / stats.total) * 100)
    : 0

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Track your full career pipeline at a glance.</p>
        </div>
        <button className={styles.addBtn} onClick={() => dispatch(openAddModal())}>
          + Add Job
        </button>
      </div>

      <StatsBar />

      <div className={styles.grid}>
        {/* Recent Applications */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Recent Applications</h2>
            <a href="/applications" className={styles.viewAll}>View all →</a>
          </div>
          <div className={styles.recentList}>
            {recent.length === 0 && (
              <div className={styles.empty}>
                No applications yet. Add your first one!
              </div>
            )}
            {recent.map(job => (
              <RecentRow key={job.id} job={job} onEdit={j => dispatch(openEditModal(j))} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Response Rate</h2>
            </div>
            <div className={styles.rateWrap}>
              <div className={styles.rateCircle}>
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--bg3)" strokeWidth="6"/>
                  <circle
                    cx="40" cy="40" r="32" fill="none"
                    stroke="var(--accent)" strokeWidth="6"
                    strokeDasharray={`${rate * 2.01} 201`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    style={{ transition: 'stroke-dasharray 0.8s ease' }}
                  />
                </svg>
                <span className={styles.rateNum}>{rate}%</span>
              </div>
              <div className={styles.rateInfo}>
                <p className={styles.rateLabel}>Interviews + Offers</p>
                <p className={styles.rateSub}>out of {stats.total} applications</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}><h2>Pipeline Status</h2></div>
            <div className={styles.pipeline}>
              {[
                { label: 'Wishlist',  val: stats.Wishlist,  color: '#a855f7' },
                { label: 'Applied',   val: stats.Applied,   color: '#3b82f6' },
                { label: 'Interview', val: stats.Interview, color: '#f59e0b' },
                { label: 'Offer',     val: stats.Offer,     color: '#22c55e' },
                { label: 'Rejected',  val: stats.Rejected,  color: '#ef4444' },
              ].map(item => (
                <div key={item.label} className={styles.pipelineRow}>
                  <span className={styles.pipelineLabel}>{item.label}</span>
                  <div className={styles.pipelineBar}>
                    <div
                      className={styles.pipelineBarFill}
                      style={{
                        width: stats.total ? `${(item.val / stats.total) * 100}%` : '0%',
                        background: item.color
                      }}
                    />
                  </div>
                  <span className={styles.pipelineCount}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
