import { User } from '@/types/User'

const authApi = process.env.AWS_AUTHENTICATION_API
const mongoUserModelAndDaoApiUrl = process.env.NEXT_PUBLIC_AWS_MONGO_USER_MODEL_AND_DAO

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
    const response = await fetch(`${mongoUserModelAndDaoApiUrl}`, {
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