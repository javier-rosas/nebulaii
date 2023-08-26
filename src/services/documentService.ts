import { User } from '@/types/User'

const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

export async function getDocumentsByUserEmail(user: User) {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${user.email}/documents`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to get documents. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(
      `Error getting documents with user email: ${user.email}.`,
      error
    )
  }
}

export async function getDocumentByUserEmailAndDocumentName(
  user: User,
  documentName: string
) {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${user.email}/documents/${documentName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to get document. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(
      `Error getting document with user email: ${user.email} and document name: ${documentName}`,
      error
    )
  }
}

export async function deleteDocumentByUserEmailAndDocumentName(
  user: User,
  documentName: string
) {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${user.email}/documents/${documentName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Error deleting document. Please try again later.')
    }
    return response
  } catch (error) {
    console.error(
      `Error deleting document with user email: ${user.email} and document name: ${documentName}`,
      error
    )
  }
}
