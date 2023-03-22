import { AudioFile } from '@/types/AudioFile'

const processAudioFileApi = process.env.NEXT_PUBLIC_AWS_PROCESS_AUDIO_FILE_URL

export async function processAudioFile(audioFileObj: AudioFile, token: string) {
  try {
    const response = await fetch(`${processAudioFileApi}`, {
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

