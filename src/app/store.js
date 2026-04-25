import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from '../features/jobs/jobsSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    ui: uiReducer,
  },
})
