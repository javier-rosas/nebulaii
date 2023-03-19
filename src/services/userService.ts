import { User } from '@/types/User'

const authApi = process.env.AWS_AUTHENTICATION_API
const mongoUserModelAndDaoApiUrl = process.env.NEXT_PUBLIC_AWS_MONGO_USER_HANDLER

export async function authenticateUser(userData: any) {
  try {
    const response = await fetch(`${authApi}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Failed to authenticate user')
    }
    const data = await response.json()
    return data.token
  } catch (error) {
    throw error
  }
}

export async function createOrUpdateUser(userData: User) {
  try {
    const response = await fetch(`${mongoUserModelAndDaoApiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userData.token
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Failed to authenticate user')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function getAllUserAudioTranscriptsAndNotes(user: User) {
  try {
    const response = await fetch(`${mongoUserModelAndDaoApiUrl}/user/${user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    return response.json()
  } catch (error) {
    console.error('Error getting audio transcripts and notes from mongo', error)
  }
}