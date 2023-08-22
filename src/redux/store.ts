import { configureStore } from '@reduxjs/toolkit'
import fileReducer from './fileSlice'
import processedFileReducer from './processedFilesSlice'

export const store = configureStore({
  reducer: {
    file: fileReducer,
    processedFiles: processedFileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
