import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import fileReducer from './fileSlice'
import processedFileReducer from './processedFilesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    file: fileReducer,
    processedFiles: processedFileReducer
  },
})
