import { AudioFile } from '@/types/AudioFile'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function processAudioFile(audioFileObj: AudioFile, token: string) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/process-audio-file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(audioFileObj),
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