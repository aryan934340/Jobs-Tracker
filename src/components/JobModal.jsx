import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addJob, updateJob } from '../features/jobs/jobsSlice'
import { closeModal } from '../features/ui/uiSlice'
import styles from './JobModal.module.css'

const EMPTY = {
  company: '', role: '', status: 'Applied', date: '',
  salary: '', url: '', location: '', type: 'Full-time', notes: ''
}

export default function JobModal() {
  const dispatch = useDispatch()
  const editingJob = useSelector(s => s.ui.editingJob)
  const [form, setForm] = useState(editingJob || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(editingJob || EMPTY)
    setErrors({})
  }, [editingJob])

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.company.trim()) e.company = 'Company is required'
    if (!form.role.trim()) e.role = 'Role is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    if (editingJob) {
      dispatch(updateJob({ ...form, id: editingJob.id }))
    } else {
      dispatch(addJob(form))
    }
    dispatch(closeModal())
  }

  const handleBgClick = useCallback((e) => {
    if (e.target === e.currentTarget) dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') dispatch(closeModal()) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [dispatch])

  return (
    <div className={styles.overlay} onClick={handleBgClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{editingJob ? 'Edit Application' : 'Add New Application'}</h3>
          <button className={styles.closeBtn} onClick={() => dispatch(closeModal())}>✕</button>
        </div>

        <div className={styles.body}>
          {/* Row 1 */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label>Company *</label>
              <input
                value={form.company}
                onChange={e => set('company', e.target.value)}
                placeholder="e.g. Google"
                className={errors.company ? styles.inputError : ''}
              />
              {errors.company && <span className={styles.errMsg}>{errors.company}</span>}
            </div>
            <div className={styles.field}>
              <label>Role *</label>
              <input
                value={form.role}
                onChange={e => set('role', e.target.value)}
                placeholder="e.g. Frontend Developer"
                className={errors.role ? styles.inputError : ''}
              />
              {errors.role && <span className={styles.errMsg}>{errors.role}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.row3}>
            <div className={styles.field}>
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option>Wishlist</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Job Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Date Applied</label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label>Salary</label>
              <input
                value={form.salary}
                onChange={e => set('salary', e.target.value)}
                placeholder="e.g. 18 LPA or $90,000"
              />
            </div>
            <div className={styles.field}>
              <label>Location</label>
              <input
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="e.g. Bangalore / Remote"
              />
            </div>
          </div>

          {/* URL */}
          <div className={styles.field}>
            <label>Job URL</label>
            <input
              value={form.url}
              onChange={e => set('url', e.target.value)}
              placeholder="https://careers.company.com/..."
            />
          </div>

          {/* Notes */}
          <div className={styles.field}>
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Interview rounds, contacts, next steps..."
              rows={3}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={() => dispatch(closeModal())}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>
            {editingJob ? 'Save Changes' : 'Add Application'}
          </button>
        </div>
      </div>
    </div>
  )
}
