const allowedFileTypes = {
  excel: {
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    extensions: ['.xls', '.xlsx'],
  },
  word: {
    mimeTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    extensions: ['.doc', '.docx'],
  },
  powerpoint: {
    mimeTypes: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    extensions: ['.ppt', '.pptx'],
  },
  pdf: {
    mimeTypes: ['application/pdf'],
    extensions: ['.pdf'],
  },
  text: {
    mimeTypes: ['text/csv', 'text/plain'],
    extensions: ['.txt', '.csv'],
  },
}

export const allowedFileExtensionsStr = (): string => {
  let extensions: string[] = []
  for (const fileType in allowedFileTypes) {
    extensions = extensions.concat(
      allowedFileTypes[fileType as keyof typeof allowedFileTypes].extensions
    )
  }
  return extensions.join(',')
}

export const allowedMimeTypesList = (): string[] => {
  let mimeTypes: string[] = []
  for (const fileType in allowedFileTypes) {
    mimeTypes = mimeTypes.concat(
      allowedFileTypes[fileType as keyof typeof allowedFileTypes].mimeTypes
    )
  }
  return mimeTypes
}
