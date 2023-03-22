import { User } from '@/types/User'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function getDiarizedTranscriptsByUserEmail(user: User) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/user/${user.email}/diarized-transcripts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get diarized transcripts. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting diarized transcripts with user email: ${user.email}.`, error)
  }
}

export async function getDiarizedTranscriptByUserEmailAndFilename(user: User, filename: string) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/user/${user.email}/diarized-transcript/${filename}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get diarized transcript. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting diarized transcript with user email: ${user.email} and filename: ${filename}`, error)
  }
}