import React from 'react'
import { useSelector } from 'react-redux'
import { selectStats } from '../features/jobs/jobsSlice'
import styles from './StatsBar.module.css'

const CARDS = [
  { key: 'total',     label: 'Total',      color: '#818cf8' },
  { key: 'Applied',   label: 'Applied',    color: '#60a5fa' },
  { key: 'Interview', label: 'Interviews', color: '#fbbf24' },
  { key: 'Offer',     label: 'Offers',     color: '#4ade80' },
  { key: 'Rejected',  label: 'Rejected',   color: '#f87171' },
]

export default function StatsBar() {
  const stats = useSelector(selectStats)

  return (
    <div className={styles.grid}>
      {CARDS.map(card => (
        <div key={card.key} className={styles.card}>
          <div className={styles.num} style={{ color: card.color }}>
            {stats[card.key] ?? 0}
          </div>
          <div className={styles.label}>{card.label}</div>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{
                width: stats.total ? `${((stats[card.key] ?? 0) / stats.total) * 100}%` : '0%',
                background: card.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
