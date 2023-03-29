import { FileState } from '@/types/FileState'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function processAudioFile(fileState: FileState, token: string) {
  try {
    fileState = {
      ...fileState,
      dateAdded: Date.now(),
    }
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/process-audio-file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(fileState),
    })
    if (!response.ok) {
      throw new Error('Failed to process audio file. Please try again later.')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}