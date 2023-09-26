const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

import { User } from '@/types/User'

export async function createOrUpdateChat(user: User, documentName: string) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/chats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify({ userEmail: user.email, documentName, chat: [] }),
    })
    if (!response.ok) {
      throw new Error(
        'Failed to create or update chat. Please try again later.'
      )
    }
    return response.json()
  } catch (error) {
    console.error(
      `Error creating/updating chat for user email: ${user.email} and document name: ${documentName}.`,
      error
    )
  }
}

export async function deleteChat(user: User, documentName: string) {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${user.email}/chats/${documentName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Error deleting chat. Please try again later.')
    }
    return response
  } catch (error) {
    console.error(
      `Error deleting chat for user email: ${user.email} and document name: ${documentName}.`,
      error
    )
  }
}

export async function getChat(user: User, documentName: string) {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${user.email}/chats/${documentName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to get chat. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(
      `Error fetching chat for user email: ${user.email} and document name: ${documentName}.`,
      error
    )
  }
}

export async function addMessageToChat(
  user: User,
  documentName: string,
  message: { isBot: boolean; message: string }
) {
  try {
    const response = await fetch(`${AWS_LAMBDA_BASE_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify({ userEmail: user.email, documentName, message }),
    })
    if (!response.ok) {
      throw new Error('Failed to add message to chat. Please try again later.')
    }
    return response.json()
  } catch (error) {
    console.error(
      `Error adding message to chat for user email: ${user.email} and document name: ${documentName}.`,
      error
    )
  }
}
