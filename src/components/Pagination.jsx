import React from 'react'
import styles from './Pagination.module.css'

export default function Pagination({ page, totalPages, goTo }) {
  if (totalPages <= 1) return null

  return (
    <div className={styles.wrap}>
      <button
        className={styles.btn}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
      >
        ‹ Prev
      </button>

      <div className={styles.pages}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
            onClick={() => goTo(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className={styles.btn}
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
      >
        Next ›
      </button>
    </div>
  )
}
