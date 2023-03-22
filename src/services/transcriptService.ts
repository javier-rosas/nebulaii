import { User } from '@/types/User'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function getTranscriptsByUserEmail(user: User) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/user/${user.email}/transcripts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get transcripts. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting transcripts with user email: ${user.email}.`, error)
  }
}

export async function getTranscriptByUserEmailAndFilename(user: User, filename: string) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/user/${user.email}/transcript/${filename}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get transcript. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting transcript with user email: ${user.email} and filename: ${filename}`, error)
  }
}