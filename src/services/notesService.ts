import { User } from '@/types/User'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function getNotesByUserEmail(user: User) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/user/${user.email}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get notes. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting notes with user email: ${user.email}.`, error)
  }
}

export async function getNotesByUserEmailAndFilename(user: User, filename: string) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/user/${user.email}/note/${filename}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get notes. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting note with user email: ${user.email} and filename: ${filename}`, error)
  }
}