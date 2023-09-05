import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { DocumentState } from '@/types/DocumentState'

// initial user state
const initialState: DocumentState = {
  documentName: '',
  description: '',
  dateAdded: Date.now(),
  documentType: null,
}

// documentSlice
export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocumentName: (state: DocumentState, action: PayloadAction<string>) => {
      state.documentName = action.payload
    },
    setDescription: (state: DocumentState, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setDocumentType: (
      state: DocumentState,
      action: PayloadAction<string | null>
    ) => {
      state.documentType = action.payload
    },
    resetDocumentState: (state: DocumentState) => {
      state.documentName = ''
      state.description = ''
      state.documentType = null
    },
  },
})

//action selector
export const {
  setDocumentName,
  setDescription,
  resetDocumentState,
  setDocumentType,
} = documentSlice.actions

// state selector
export const selectDocument = (state: DocumentState) => state

export default documentSlice.reducer
