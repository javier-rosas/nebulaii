import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFilesByUserEmail } from '@/services/fileService'
import { User } from '@/types/User'

type ProcessedFilePayload = {
  userEmail: string
  filename: string
  description: string
  dateAdded: string
}

type ProcessedFilesState = ProcessedFilePayload[] | []

// initial user state
const initialState: ProcessedFilesState = []

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

// getProcessedFiles
export const apiGetProcessedFiles = createAsyncThunk(
  'processedFiles/getProcessedFiles',
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

// processedFileSlice
export const processedFilesSlice = createSlice({
  name: 'processedFiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiGetProcessedFiles.fulfilled, (state, action: any) => {
      return action.payload
    })
  },
})

// state selector
export const selectProccesedFiles = (state: ProcessedFilesState) => state

export default processedFilesSlice.reducer
