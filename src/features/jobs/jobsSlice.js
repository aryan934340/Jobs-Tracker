import { createSlice } from '@reduxjs/toolkit'

const SAMPLE_JOBS = [
  { id: 1, company: 'Google', role: 'Frontend Engineer', status: 'Interview', date: '2026-04-10', salary: '$140,000', url: 'https://careers.google.com', notes: 'Round 2 scheduled. Good vibes from recruiter.', location: 'Bangalore', type: 'Full-time' },
  { id: 2, company: 'Flipkart', role: 'React Developer', status: 'Applied', date: '2026-04-15', salary: '18 LPA', url: '', notes: 'Applied via referral from Arjun.', location: 'Bangalore', type: 'Full-time' },
  { id: 3, company: 'Amazon', role: 'SDE-2', status: 'Rejected', date: '2026-04-01', salary: '$120,000', url: '', notes: 'Failed OA - practice more DSA.', location: 'Hyderabad', type: 'Full-time' },
  { id: 4, company: 'Razorpay', role: 'UI Engineer', status: 'Offer', date: '2026-03-28', salary: '22 LPA', url: '', notes: 'Offer letter received! Deadline May 5.', location: 'Bangalore', type: 'Full-time' },
  { id: 5, company: 'Swiggy', role: 'Frontend Dev', status: 'Wishlist', date: '', salary: '15 LPA', url: 'https://careers.swiggy.com', notes: 'Dream company — apply next month.', location: 'Bangalore', type: 'Full-time' },
  { id: 6, company: 'Zepto', role: 'React Native Dev', status: 'Applied', date: '2026-04-18', salary: '14 LPA', url: '', notes: '', location: 'Mumbai', type: 'Full-time' },
  { id: 7, company: 'Atlassian', role: 'Software Engineer', status: 'Interview', date: '2026-04-08', salary: '$110,000', url: '', notes: 'System design round next week.', location: 'Remote', type: 'Remote' },
]

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('jt_jobs')
    return data ? JSON.parse(data) : SAMPLE_JOBS
  } catch {
    return SAMPLE_JOBS
  }
}

const saveToStorage = (jobs) => {
  localStorage.setItem('jt_jobs', JSON.stringify(jobs))
}

const initialState = {
  jobs: loadFromStorage(),
  searchQuery: '',
  statusFilter: '',
  typeFilter: '',
  sortBy: 'date-desc',
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action) => {
      const newJob = { ...action.payload, id: Date.now() }
      state.jobs.unshift(newJob)
      saveToStorage(state.jobs)
    },
    updateJob: (state, action) => {
      const idx = state.jobs.findIndex(j => j.id === action.payload.id)
      if (idx !== -1) state.jobs[idx] = action.payload
      saveToStorage(state.jobs)
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(j => j.id !== action.payload)
      saveToStorage(state.jobs)
    },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload },
    setTypeFilter: (state, action) => { state.typeFilter = action.payload },
    setSortBy: (state, action) => { state.sortBy = action.payload },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.statusFilter = ''
      state.typeFilter = ''
      state.sortBy = 'date-desc'
    },
  },
})

export const {
  addJob, updateJob, deleteJob,
  setSearchQuery, setStatusFilter, setTypeFilter,
  setSortBy, clearFilters,
} = jobsSlice.actions

// Selectors
export const selectAllJobs = (state) => state.jobs.jobs
export const selectFilters = (state) => ({
  searchQuery: state.jobs.searchQuery,
  statusFilter: state.jobs.statusFilter,
  typeFilter: state.jobs.typeFilter,
  sortBy: state.jobs.sortBy,
})

export const selectFilteredJobs = (state) => {
  const { jobs, searchQuery, statusFilter, typeFilter, sortBy } = state.jobs
  let list = [...jobs]

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    list = list.filter(j =>
      j.company.toLowerCase().includes(q) ||
      j.role.toLowerCase().includes(q) ||
      (j.location || '').toLowerCase().includes(q)
    )
  }
  if (statusFilter) list = list.filter(j => j.status === statusFilter)
  if (typeFilter) list = list.filter(j => j.type === typeFilter)

  switch (sortBy) {
    case 'date-desc': list.sort((a, b) => (b.date || '').localeCompare(a.date || '')); break
    case 'date-asc':  list.sort((a, b) => (a.date || '').localeCompare(b.date || '')); break
    case 'company':   list.sort((a, b) => a.company.localeCompare(b.company)); break
    case 'salary':    list.sort((a, b) => b.salary.localeCompare(a.salary)); break
    default: break
  }
  return list
}

export const selectStats = (state) => {
  const jobs = state.jobs.jobs
  const counts = { Wishlist: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 }
  jobs.forEach(j => { if (counts[j.status] !== undefined) counts[j.status]++ })
  return { total: jobs.length, ...counts }
}

export default jobsSlice.reducer
