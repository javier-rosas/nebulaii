import { createSlice } from '@reduxjs/toolkit'

type FileState = {
  filename: string;
  language: string;
  enableSpeakerDiarization: boolean;
  minSpeakerCount: number | null;
  maxSpeakerCount: number | null;
  description: string;
}

// initial user state
const initialState: FileState = {
  filename: '',
  language: '',
  enableSpeakerDiarization: false,
  minSpeakerCount: null,
  maxSpeakerCount: null,
  description: '',
}

// fileSlice
export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFilename: (state, action) => {
      state.filename = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setEnableSpeakerDiarization: (state, action) => {
      state.enableSpeakerDiarization = action.payload
    },
    setMinSpeakerCount: (state, action) => {
      state.minSpeakerCount = action.payload
    },
    setMaxSpeakerCount: (state, action) => {
      state.maxSpeakerCount = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    resetFileState: (state, action) => {
      state.filename = ''
      state.language = ''
      state.enableSpeakerDiarization = false
      state.minSpeakerCount = null
      state.maxSpeakerCount = null
      state.description = '';
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
  resetFileState
} = fileSlice.actions

// state selector
export const selectFile = (state: FileState) => state

export default fileSlice.reducer
