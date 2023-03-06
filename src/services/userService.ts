const authApi = process.env.NEXT_PUBLIC_AWS_AUTHENTICATION_API
import { User } from '@/types/User'

export async function authenticateUser(userData: User) {
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
