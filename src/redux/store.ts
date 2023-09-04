import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './documentSlice'
import processedDocumentReducer from './processedDocumentSlice'

export const store = configureStore({
  reducer: {
    document: documentReducer,
    processedDocuments: processedDocumentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
