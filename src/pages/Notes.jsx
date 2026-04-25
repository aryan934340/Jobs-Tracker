import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllJobs, updateJob } from '../features/jobs/jobsSlice'
import { openEditModal } from '../features/ui/uiSlice'
import StatusBadge from '../components/StatusBadge'
import styles from './Notes.module.css'

export default function Notes() {
  const dispatch = useDispatch()
  const jobs = useSelector(selectAllJobs)
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(false)
  const [noteText, setNoteText] = useState('')

  const withNotes = jobs.filter(j => j.notes && j.notes.trim())
  const noNotes = jobs.filter(j => !j.notes || !j.notes.trim())

  const selectJob = (job) => {
    setSelected(job)
    setEditing(false)
    setNoteText(job.notes || '')
  }

  const saveNote = () => {
    if (!selected) return
    dispatch(updateJob({ ...selected, notes: noteText }))
    setSelected({ ...selected, notes: noteText })
    setEditing(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Notes</h1>
        <p className={styles.sub}>Quick notes and reminders for each application.</p>
      </div>

      <div className={styles.grid}>
        {/* Left: list */}
        <div className={styles.list}>
          {withNotes.length > 0 && (
            <>
              <div className={styles.listSection}>With Notes ({withNotes.length})</div>
              {withNotes.map(job => (
                <div
                  key={job.id}
                  className={`${styles.listItem} ${selected?.id === job.id ? styles.listItemActive : ''}`}
                  onClick={() => selectJob(job)}
                >
                  <div className={styles.listTop}>
                    <span className={styles.listCompany}>{job.company}</span>
                    <StatusBadge status={job.status} size="sm" />
                  </div>
                  <div className={styles.listRole}>{job.role}</div>
                  <div className={styles.listNote}>{job.notes}</div>
                </div>
              ))}
            </>
          )}

          {noNotes.length > 0 && (
            <>
              <div className={styles.listSection}>No Notes ({noNotes.length})</div>
              {noNotes.map(job => (
                <div
                  key={job.id}
                  className={`${styles.listItem} ${styles.listItemDim} ${selected?.id === job.id ? styles.listItemActive : ''}`}
                  onClick={() => selectJob(job)}
                >
                  <div className={styles.listTop}>
                    <span className={styles.listCompany}>{job.company}</span>
                    <StatusBadge status={job.status} size="sm" />
                  </div>
                  <div className={styles.listRole}>{job.role}</div>
                </div>
              ))}
            </>
          )}

          {jobs.length === 0 && (
            <div className={styles.empty}>No applications yet.</div>
          )}
        </div>

        {/* Right: detail */}
        <div className={styles.detail}>
          {!selected ? (
            <div className={styles.detailEmpty}>
              <div className={styles.detailEmptyIcon}>◇</div>
              <p>Select an application to view or edit its notes.</p>
            </div>
          ) : (
            <div>
              <div className={styles.detailHeader}>
                <div>
                  <div className={styles.detailCompany}>{selected.company}</div>
                  <div className={styles.detailRole}>{selected.role}</div>
                </div>
                <div className={styles.detailActions}>
                  <StatusBadge status={selected.status} />
                  <button
                    className={styles.editJobBtn}
                    onClick={() => dispatch(openEditModal(selected))}
                  >
                    Edit Job
                  </button>
                </div>
              </div>

              <div className={styles.noteSection}>
                <div className={styles.noteSectionHeader}>
                  <span>Notes</span>
                  {!editing && (
                    <button className={styles.editNoteBtn} onClick={() => setEditing(true)}>
                      Edit
                    </button>
                  )}
                </div>

                {editing ? (
                  <>
                    <textarea
                      className={styles.noteTextarea}
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Add notes about interview rounds, contacts, deadlines..."
                      rows={8}
                      autoFocus
                    />
                    <div className={styles.noteActions}>
                      <button className={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                      <button className={styles.saveBtn} onClick={saveNote}>Save Notes</button>
                    </div>
                  </>
                ) : (
                  <div className={styles.noteContent}>
                    {selected.notes
                      ? selected.notes.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))
                      : <span className={styles.noNote}>No notes yet. Click Edit to add some.</span>
                    }
                  </div>
                )}
              </div>

              {/* Job meta */}
              <div className={styles.metaGrid}>
                {[
                  { label: 'Date Applied', val: selected.date || '—' },
                  { label: 'Salary', val: selected.salary || '—' },
                  { label: 'Location', val: selected.location || '—' },
                  { label: 'Type', val: selected.type || '—' },
                ].map(m => (
                  <div key={m.label} className={styles.metaItem}>
                    <div className={styles.metaLabel}>{m.label}</div>
                    <div className={styles.metaVal}>{m.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
