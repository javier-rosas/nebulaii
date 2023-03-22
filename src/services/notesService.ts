import { User } from '@/types/User'

const awsMongoHandlerURL = process.env.NEXT_PUBLIC_AWS_MONGO_HANDLER_URL

export async function getNotesByUserEmail(user: User) {
  try {
    const response = await fetch(`${awsMongoHandlerURL}/users/${user.email}/notes`, {
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
    const response = await fetch(`${awsMongoHandlerURL}/users/${user.email}/notes/${filename}`, {
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
    console.error(`Error getting notes with user email: ${user.email} and filename: ${filename}`, error)
  }
}