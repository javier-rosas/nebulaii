import { createSlice } from '@reduxjs/toolkit'

type FileState = {
  filename: string
  language: string
  enableSpeakerDiarization: boolean
  minSpeakerCount: number | null
  maxSpeakerCount: number | null
}

// initial user state
const initialState: FileState = {
  filename: '',
  language: '',
  enableSpeakerDiarization: false,
  minSpeakerCount: null,
  maxSpeakerCount: null,
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
      state.filename = action.payload
    },
    setMaxSpeakerCount: (state, action) => {
      state.filename = action.payload
    },
  },
})

//action selector
export const {
  setFilename,
  setLanguage,
  setEnableSpeakerDiarization,
  setMinSpeakerCount,
  setMaxSpeakerCount,
} = fileSlice.actions

// state selector
export const selectFile = (state: FileState) => state

export default fileSlice.reducer
