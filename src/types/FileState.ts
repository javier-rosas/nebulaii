export type FileState = {
  filename: string;
  language: string;
  enableSpeakerDiarization: boolean;
  minSpeakerCount: number | null;
  maxSpeakerCount: number | null;
  description: string;
  dateAdded: number;
  fileType: string | null;
}