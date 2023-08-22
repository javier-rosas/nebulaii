import { createSlice } from '@reduxjs/toolkit'
import { ProcessedFiles } from '@/types/ProcessedFiles'
import { ProcessedFilePayload } from '@/types/ProcessedFiles'

// initial user state
const initialState: ProcessedFiles = {
  regularList: [],
  filteredList: [],
}

// Helper function to filter files
const filterFiles = (fileList: ProcessedFilePayload[], filename: string) => {
  return fileList.filter((file) => file.filename !== filename)
}

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
    setFiles: (state, action: FilterFilesAction) => {
      state.filteredList = action.payload
      state.regularList = action.payload
    },
    deleteFile: (state, action: { payload: string }) => {
      state.regularList = filterFiles(state.regularList, action.payload)
      state.filteredList = filterFiles(state.filteredList, action.payload)
    },
  },
})

// action creators
export const { setFilteredFiles, setFiles, deleteFile } =
  processedFilesSlice.actions

// state selector
export const selectProccesedFiles = (state: ProcessedFiles) => state

export default processedFilesSlice.reducer
