import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredJobs, deleteJob } from '../features/jobs/jobsSlice'
import { openEditModal, openAddModal } from '../features/ui/uiSlice'
import SearchFilterBar from '../components/SearchFilterBar'
import StatusBadge from '../components/StatusBadge'
import Pagination from '../components/Pagination'
import { usePagination } from '../hooks/usePagination'
import styles from './Applications.module.css'

const JobRow = memo(({ job, onEdit, onDelete }) => (
  <tr className={styles.row}>
    <td>
      <div className={styles.companyCell}>
        <div className={styles.avatar}>{job.company[0].toUpperCase()}</div>
        <div>
          <div className={styles.companyName}>{job.company}</div>
          <div className={styles.location}>{job.location || '—'}</div>
        </div>
      </div>
    </td>
    <td>
      <div className={styles.role}>{job.role}</div>
      <div className={styles.type}>{job.type}</div>
    </td>
    <td><StatusBadge status={job.status} /></td>
    <td className={styles.dateCell}>{job.date || '—'}</td>
    <td className={styles.salaryCell}>{job.salary || '—'}</td>
    <td>
      <div className={styles.actions}>
        {job.url && (
          <a href={job.url} target="_blank" rel="noreferrer" className={styles.linkBtn} title="Open job listing">↗</a>
        )}
        <button className={styles.editBtn} onClick={() => onEdit(job)}>Edit</button>
        <button className={styles.delBtn} onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </td>
  </tr>
))

export default function Applications() {
  const dispatch = useDispatch()
  const filtered = useSelector(selectFilteredJobs)
  const { paged, page, totalPages, goTo } = usePagination(filtered, 8)

  const handleDelete = (id) => {
    if (window.confirm('Remove this application?')) dispatch(deleteJob(id))
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Applications</h1>
          <p className={styles.sub}>{filtered.length} application{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <button className={styles.addBtn} onClick={() => dispatch(openAddModal())}>
          + Add Job
        </button>
      </div>

      <SearchFilterBar />

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className={styles.empty}>
                    <div className={styles.emptyIcon}>◈</div>
                    <p>No applications match your filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map(job => (
                <JobRow
                  key={job.id}
                  job={job}
                  onEdit={j => dispatch(openEditModal(j))}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} goTo={goTo} />
    </div>
  )
}
