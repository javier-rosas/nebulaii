export type ProcessedDocumentPayload = {
  userEmail: string
  documentName: string
  description: string
  dateAdded: string
}

export type ProcessedDocuments = {
  regularList: ProcessedDocumentPayload[] | []
  filteredList: ProcessedDocumentPayload[] | []
}
