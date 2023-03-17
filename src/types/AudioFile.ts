export type AudioFile = {
  userEmail: string,
  filename: string,
  description: string,
  dateAdded: Date,
  language: string,
  enableSpeakerDiarization: boolean,
  minSpeakerCount: number,
  maxSpeakerCount: number
}