import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllJobs, selectStats } from '../features/jobs/jobsSlice'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area
} from 'recharts'
import styles from './Analytics.module.css'

const STATUS_COLORS = {
  Wishlist: '#a855f7', Applied: '#3b82f6',
  Interview: '#f59e0b', Offer: '#22c55e', Rejected: '#ef4444'
}

export default function Analytics() {
  const jobs = useSelector(selectAllJobs)
  const stats = useSelector(selectStats)

  // Pie data
  const pieData = useMemo(() =>
    Object.entries(STATUS_COLORS).map(([name, color]) => ({
      name, value: stats[name] || 0, color
    })).filter(d => d.value > 0),
  [stats])

  // Applications per month
  const monthlyData = useMemo(() => {
    const map = {}
    jobs.forEach(j => {
      if (!j.date) return
      const mon = j.date.slice(0, 7)
      map[mon] = (map[mon] || 0) + 1
    })
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, count]) => ({ month: month.slice(5) + '/' + month.slice(2,4), count }))
  }, [jobs])

  // Status over time
  const locationData = useMemo(() => {
    const map = {}
    jobs.forEach(j => {
      const loc = j.location || 'Unknown'
      map[loc] = (map[loc] || 0) + 1
    })
    return Object.entries(map)
      .sort(([,a],[,b]) => b - a)
      .slice(0, 6)
      .map(([location, count]) => ({ location, count }))
  }, [jobs])

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label || payload[0]?.name}</p>
        <p className={styles.tooltipVal}>{payload[0]?.value}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.sub}>Visual breakdown of your job search progress.</p>
      </div>

      <div className={styles.grid}>
        {/* Pie Chart */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Status Distribution</h2>
          {pieData.length === 0 ? (
            <div className={styles.empty}>No data yet</div>
          ) : (
            <div className={styles.pieWrap}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.legend}>
                {pieData.map(d => (
                  <div key={d.name} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: d.color }} />
                    <span>{d.name}</span>
                    <span className={styles.legendVal}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Monthly Bar Chart */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Applications by Month</h2>
          {monthlyData.length === 0 ? (
            <div className={styles.empty}>Add applications with dates to see this chart</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg3)' }} />
                <Bar dataKey="count" fill="var(--accent)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Location Chart */}
        <div className={`${styles.card} ${styles.cardFull}`}>
          <h2 className={styles.cardTitle}>Applications by Location</h2>
          {locationData.length === 0 ? (
            <div className={styles.empty}>No location data available</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={locationData} layout="vertical" margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="location" type="category" tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg3)' }} />
                <Bar dataKey="count" fill="#818cf8" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Key metrics */}
        <div className={`${styles.card} ${styles.cardFull}`}>
          <h2 className={styles.cardTitle}>Key Metrics</h2>
          <div className={styles.metrics}>
            {[
              { label: 'Total Applied', val: stats.total },
              { label: 'Active (Applied + Interview)', val: stats.Applied + stats.Interview },
              { label: 'Offer Rate', val: stats.total ? `${Math.round((stats.Offer / stats.total) * 100)}%` : '0%' },
              { label: 'Interview Rate', val: stats.total ? `${Math.round(((stats.Interview + stats.Offer) / stats.total) * 100)}%` : '0%' },
              { label: 'Rejection Rate', val: stats.total ? `${Math.round((stats.Rejected / stats.total) * 100)}%` : '0%' },
              { label: 'Wishlist', val: stats.Wishlist },
            ].map(m => (
              <div key={m.label} className={styles.metric}>
                <div className={styles.metricVal}>{m.val}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
