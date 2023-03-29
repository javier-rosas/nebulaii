import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileState } from '@/types/FileState'


// initial user state
const initialState: FileState = {
  filename: '',
  language: '',
  enableSpeakerDiarization: false,
  minSpeakerCount: null,
  maxSpeakerCount: null,
  description: '',
  dateAdded: Date.now(),
  fileType: null
}

// fileSlice
export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFilename: (state: FileState, action: PayloadAction<string>) => {
      state.filename = action.payload
    },
    setLanguage: (state: FileState, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    setEnableSpeakerDiarization: (state: FileState, action: PayloadAction<boolean>) => {
      state.enableSpeakerDiarization = action.payload
    },
    setMinSpeakerCount: (state: FileState, action: PayloadAction<number | null>) => {
      state.minSpeakerCount = action.payload
    },
    setMaxSpeakerCount: (state: FileState, action: PayloadAction<number | null>) => {
      state.maxSpeakerCount = action.payload
    },
    setDescription: (state: FileState, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setFileType: (state: FileState, action: PayloadAction<string>) => {
      state.fileType = action.payload
    },
    resetFileState: (state: FileState) => {
      state.filename = ''
      state.language = ''
      state.enableSpeakerDiarization = false
      state.minSpeakerCount = null
      state.maxSpeakerCount = null
      state.description = '';
      state.fileType = null;
    },
  }
})

//action selector
export const {
  setFilename,
  setLanguage,
  setEnableSpeakerDiarization,
  setMinSpeakerCount,
  setMaxSpeakerCount,
  resetFileState,
} = fileSlice.actions

// state selector
export const selectFile = (state: FileState) => state

export default fileSlice.reducer
