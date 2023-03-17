import { User } from '@/types/User'

const mongoUserModelAndDaoApiUrl = process.env.NEXT_PUBLIC_AWS_MONGO_USER_MODEL_AND_DAO

export async function getAllUserAudioTranscriptsAndNotes(user: User) {
  try {
    const response = await fetch(`${mongoUserModelAndDaoApiUrl}/users/:${user.email}`, {
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