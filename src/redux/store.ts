import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './documentSlice'
import processedDocumentReducer from './processedDocumentSlice'

export const store = configureStore({
  reducer: {
    file: documentReducer,
    processedDocuments: processedDocumentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
