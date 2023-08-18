import { User } from '@/types/User'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function authenticateUser(userData: any) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Failed to authenticate user. Please try again later.')
    }
    const data = await response.json()
    return data.token
  } catch (error) {
    throw error
  }
}

export async function createOrUpdateUser(user: User) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify(user),
    })
    if (!response.ok) {
      throw new Error(
        'Failed to create or update user. Please try again later.'
      )
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
