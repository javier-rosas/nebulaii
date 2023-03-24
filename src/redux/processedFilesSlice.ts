import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFilesByUserEmail } from '@/services/fileService'
import { User } from '@/types/User'
import { ProcessedFiles } from '@/types/ProcessedFiles'
import { ProcessedFilePayload } from '@/types/ProcessedFiles'

// initial user state
const initialState: ProcessedFiles = {
  regularList: [],
  filteredList: [],
}

/**
 * Format date string
 * @param {string} date - Date string
 * @returns {string} formatted date string
 */
const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  const formattedDate = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} at ${time}`
  return formattedDate
}

/**
 * Get all processed files by user email
 * @param payload - User object
 * @returns - Array of processed files
 */
export const apiGetFilesByUserEmail = createAsyncThunk(
  'processedFiles/apiGetFilesByUserEmail',
  async (payload: User, { rejectWithValue }) => {
    try {
      const res = await getFilesByUserEmail(payload)
      if (!res) return
      const files = res.map((file: any) => ({
        ...file,
        dateAdded: formatDate(file.dateAdded),
      }))
      return files
    } catch (e: any) {
      if (!e.response) throw e
      return rejectWithValue(e.response.data)
    }
  }
)

type FilterFilesAction = {
  payload: ProcessedFilePayload[]
}
// processedFileSlice
export const processedFilesSlice = createSlice({
  name: 'processedFiles',
  initialState,
  reducers: {
    filterFiles: (state, action: FilterFilesAction) => {
      state.filteredList = action.payload
    },
    resetFilteredFiles: (state, action: FilterFilesAction) => {
      state.filteredList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(apiGetFilesByUserEmail.fulfilled, (state, action: any) => {
      state.regularList = action.payload
      state.filteredList = action.payload
    })
  },
})

// action creators
export const { filterFiles } = processedFilesSlice.actions

// state selector
export const selectProccesedFiles = (state: ProcessedFiles) => state

export default processedFilesSlice.reducer
