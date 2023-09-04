import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    setFilename: (state: DocumentState, action: PayloadAction<string>) => {
      state.documentName = action.payload
    },
    setDescription: (state: DocumentState, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setFileType: (state: DocumentState, action: PayloadAction<string>) => {
      state.documentType = action.payload
    },
    resetFileState: (state: DocumentState) => {
      state.documentName = ''
      state.description = ''
      state.documentType = null
    },
  },
})

//action selector
export const { setFilename, resetFileState, setFileType } =
  documentSlice.actions

// state selector
export const selectFile = (state: DocumentState) => state

export default documentSlice.reducer
