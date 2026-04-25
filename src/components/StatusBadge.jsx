import React from 'react'

const CONFIG = {
  Wishlist:  { bg: 'rgba(168,85,247,0.12)',  color: '#c084fc', dot: '#a855f7' },
  Applied:   { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa', dot: '#3b82f6' },
  Interview: { bg: 'rgba(245,158,11,0.12)',  color: '#fbbf24', dot: '#f59e0b' },
  Offer:     { bg: 'rgba(34,197,94,0.12)',   color: '#4ade80', dot: '#22c55e' },
  Rejected:  { bg: 'rgba(239,68,68,0.12)',   color: '#f87171', dot: '#ef4444' },
}

export default function StatusBadge({ status, size = 'md' }) {
  const cfg = CONFIG[status] || CONFIG.Applied
  const isSmall = size === 'sm'

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: isSmall ? 5 : 6,
      background: cfg.bg,
      color: cfg.color,
      borderRadius: 99,
      padding: isSmall ? '3px 9px' : '4px 12px',
      fontSize: isSmall ? 11 : 12,
      fontWeight: 500,
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: isSmall ? 5 : 6,
        height: isSmall ? 5 : 6,
        borderRadius: '50%',
        background: cfg.dot,
        flexShrink: 0,
      }} />
      {status}
    </span>
  )
}
