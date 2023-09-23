import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './documentSlice'
import listSpinnerReducer from './listSpinnerSlice'
import processedDocumentReducer from './processedDocumentSlice'

export const store = configureStore({
  reducer: {
    document: documentReducer,
    processedDocuments: processedDocumentReducer,
    listSpinner: listSpinnerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
