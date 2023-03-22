import { User } from '@/types/User'

const awsMongoHandlerURL = process.env.NEXT_PUBLIC_AWS_MONGO_HANDLER_URL

export async function getFilesByUserEmail(user: User) {
  try {
    const response = await fetch(`${awsMongoHandlerURL}/users/${user.email}/files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get files. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting files with user email: ${user.email}.`, error)
  }
}

export async function getFileByUserEmailAndFilename(user: User, filename: string) {
  try {
    const response = await fetch(`${awsMongoHandlerURL}/users/${user.email}/files/${filename}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token
      }
    })
    if (!response.ok) {
      throw new Error('Failed to get file. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(`Error getting file with user email: ${user.email} and filename: ${filename}`, error)
  }
}