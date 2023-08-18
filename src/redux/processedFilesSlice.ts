import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getFilesByUserEmail,
  deleteFileByUserEmailAndFilename,
} from '@/services/fileService'
import { User } from '@/types/User'
import { ProcessedFiles } from '@/types/ProcessedFiles'
import { ProcessedFilePayload } from '@/types/ProcessedFiles'
import { formatDate } from '@/utils/helpers'

// initial user state
const initialState: ProcessedFiles = {
  regularList: [],
  filteredList: [],
}

// Helper function to filter files
const filterFiles = (fileList: ProcessedFilePayload[], filename: string) => {
  return fileList.filter((file) => file.filename !== filename)
}

/**
 * Get all processed files by user email
 * @param payload - User object
 * @returns - Array of processed files
 */
export const apiGetFilesByUserEmail = createAsyncThunk(
  'processedFiles/apiGetFilesByUserEmail',
  async (payload: User) => {
    const res = await getFilesByUserEmail(payload)
    const files = res.map((file: any) => ({
      ...file,
      dateAdded: formatDate(file.dateAdded),
    }))
    return files
  }
)

/**
 * Delete processed file by user email and filename
 */
export const apiDeleteFileByUserEmailAndFilename = createAsyncThunk(
  'processedFiles/apiDeleteFileByUserEmailAndFilename',
  async ({ user, filename }: { user: User; filename: string }) => {
    await deleteFileByUserEmailAndFilename(user, filename)
    return filename
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
    setFilteredFiles: (state, action: FilterFilesAction) => {
      state.filteredList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiGetFilesByUserEmail.fulfilled, (state, action: any) => {
      state.regularList = action.payload
      state.filteredList = action.payload
    })
    builder.addCase(
      apiDeleteFileByUserEmailAndFilename.fulfilled,
      (state, action: { payload: string }) => {
        const deletedFilename = action.payload
        state.regularList = filterFiles(state.regularList, deletedFilename)
        state.filteredList = filterFiles(state.filteredList, deletedFilename)
      }
    )
  },
})

// action creators
export const { setFilteredFiles } = processedFilesSlice.actions

// state selector
export const selectProccesedFiles = (state: ProcessedFiles) => state

export default processedFilesSlice.reducer
