export type ProcessedFilePayload = {
  userEmail: string
  filename: string
  description: string
  dateAdded: string
}

export type ProcessedFiles = {
  regularList: ProcessedFilePayload[] | [],
  filteredList: ProcessedFilePayload[] | [],
}