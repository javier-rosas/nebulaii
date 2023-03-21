import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllUserAudioTranscriptsAndNotes } from '@/services/userService'
import { User } from "@/types/User"


type ProcessedFilePayload = {
  filename: string;
  transcript?: string;
  diarizedTranscript?: string[];
  notes: string;
  description: string;
  dateAdded?: string;
};

type ProcessedFilesState = ProcessedFilePayload[] | [];

type ProcessedFile = {
  payload: ProcessedFilePayload;
};

// initial user state
const initialState: ProcessedFilesState = []

const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const formattedDate = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} at ${time}`
  return formattedDate
}

const createFileObjects = (filenames: string[], transcriptAndNotesData: any) =>
  filenames.map((filename) => {
    const fileObject: any = { filename }
    const transcript = transcriptAndNotesData.transcripts.find(
      (obj: any) => obj.filename === filename
    )
    if (transcript) {
      fileObject.transcript = transcript.transcript
    }
    const diarizedTranscript =
      transcriptAndNotesData.diarizedTranscripts.find(
        (obj: any) => obj.filename === filename
      )
    if (diarizedTranscript) {
      fileObject.diarizedTranscript = diarizedTranscript.transcript.map(
        ({ sentence }: any) => sentence
      )
    }
    const notes = transcriptAndNotesData.notes.find(
      (obj: any) => obj.filename === filename
    )
    fileObject.notes = notes.notes
    fileObject.description = notes.description
    fileObject.dateAdded = formatDate(notes.dateAdded)
    return fileObject
})

// getProcessedFiles
export const apiGetProcessedFiles = createAsyncThunk(
  'processedFiles/getProcessedFiles', 
  async (payload: User, { rejectWithValue }) => {
    try {
      const { notes, transcripts, diarizedTranscripts } = await getAllUserAudioTranscriptsAndNotes(payload)
      if (!notes) return
      const filenames = notes.map(({ filename }: any) => filename)
      const fileObjects = createFileObjects(filenames, { notes, transcripts, diarizedTranscripts })
      return fileObjects
    } catch(e: any) {
      if (!e.response) throw e
      return rejectWithValue(e.response.data)
    }
})


// processedFileSlice
export const processedFilesSlice = createSlice({
  name: 'processedFiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiGetProcessedFiles.fulfilled, (state, action: any) => {
        return action.payload;
      })
  },
})

// state selector
export const selectProccesedFiles = (state: ProcessedFilesState) => state

export default processedFilesSlice.reducer