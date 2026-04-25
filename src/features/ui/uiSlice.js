import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalOpen: false,
  editingJob: null,   // null = add mode, object = edit mode
  darkMode: true,
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.modalOpen = true
      state.editingJob = null
    },
    openEditModal: (state, action) => {
      state.modalOpen = true
      state.editingJob = action.payload
    },
    closeModal: (state) => {
      state.modalOpen = false
      state.editingJob = null
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { openAddModal, openEditModal, closeModal, toggleDarkMode, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
