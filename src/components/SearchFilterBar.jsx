import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSearchQuery, setStatusFilter, setTypeFilter,
  setSortBy, clearFilters, selectFilters
} from '../features/jobs/jobsSlice'
import { useDebounce } from '../hooks/useDebounce'
import styles from './SearchFilterBar.module.css'

export default function SearchFilterBar() {
  const dispatch = useDispatch()
  const { searchQuery, statusFilter, typeFilter, sortBy } = useSelector(selectFilters)

  const handleSearch = useCallback(
    useDebounce((val) => dispatch(setSearchQuery(val)), 300),
    [dispatch]
  )

  const hasFilters = searchQuery || statusFilter || typeFilter || sortBy !== 'date-desc'

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          className={styles.search}
          defaultValue={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search company, role, location..."
        />
      </div>

      <select
        className={styles.select}
        value={statusFilter}
        onChange={e => dispatch(setStatusFilter(e.target.value))}
      >
        <option value="">All Statuses</option>
        <option>Wishlist</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <select
        className={styles.select}
        value={typeFilter}
        onChange={e => dispatch(setTypeFilter(e.target.value))}
      >
        <option value="">All Types</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Remote</option>
        <option>Internship</option>
        <option>Contract</option>
      </select>

      <select
        className={styles.select}
        value={sortBy}
        onChange={e => dispatch(setSortBy(e.target.value))}
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="company">Company A–Z</option>
        <option value="salary">Salary</option>
      </select>

      {hasFilters && (
        <button className={styles.clearBtn} onClick={() => dispatch(clearFilters())}>
          Clear
        </button>
      )}
    </div>
  )
}
