import {
  ProcessedDocumentPayload,
  ProcessedDocuments,
} from '@/types/ProcessedDocuments'

import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'

// initial user state
const initialState: ProcessedDocuments = {
  regularList: [],
  filteredList: [],
}

// Helper function to filter documents
const filterDocuments = (
  documentList: ProcessedDocumentPayload[],
  documentName: string
) => {
  return documentList.filter(
    (document: ProcessedDocumentPayload) =>
      document.documentName !== documentName
  )
}

type FilterDocumentAction = {
  payload: ProcessedDocumentPayload[]
}
// processedDocumentSlice
export const processedDocumentSlice = createSlice({
  name: 'processedDocuments',
  initialState,
  reducers: {
    setFilteredDocuments: (state, action: FilterDocumentAction) => {
      state.filteredList = action.payload
    },
    setDocuments: (state, action: FilterDocumentAction) => {
      state.filteredList = action.payload
      state.regularList = action.payload
    },
    deleteDocument: (state, action: { payload: string }) => {
      state.regularList = filterDocuments(state.regularList, action.payload)
      state.filteredList = filterDocuments(state.filteredList, action.payload)
    },
  },
})

// action creators
export const { setFilteredDocuments, setDocuments, deleteDocument } =
  processedDocumentSlice.actions

// state selector
export const selectProccesedFiles = (state: RootState) =>
  state.processedDocuments

export default processedDocumentSlice.reducer
