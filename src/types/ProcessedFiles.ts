type ProcessedFilePayload = {
  userEmail: string
  filename: string
  description: string
  dateAdded: string
}

export type ProcessedFiles = ProcessedFilePayload[] | []