const AWS_LAMBDA_BASE_URL = process.env.NEXT_PUBLIC_AWS_LAMBDA_BASE_URL

import { showErrorToast, showSuccessToast } from '@/utils/helpers'

import { User } from '../types/User'

export async function startJob(
  userEmail: string,
  documentName: string,
  token: string
) {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${userEmail}/jobs/${documentName}/start-job`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to process audio file. Please try again later.')
    }
    return response
  } catch (error) {
    throw error
  }
}

export async function deleteJob(
  userEmail: string,
  documentName: string,
  token: string
): Promise<Response> {
  try {
    const response = await fetch(
      `${AWS_LAMBDA_BASE_URL}/users/${userEmail}/jobs/${documentName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to delete the job. Please try again later.')
    }
    return response
  } catch (error) {
    console.error('Error deleting job:', error)
    throw error
  }
}

export async function checkForJobCompletion(
  user: User,
  documentName: string
): Promise<string> {
  const initialTimeout = 3000
  async function fetchJobStatus(timeout: number): Promise<string> {
    if (timeout > 128000) {
      console.error('Job status check exceeded 128 seconds. Exiting.')
      return 'TIMEOUT' // Signal that the timeout was exceeded
    }
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))
    await delay(timeout)
    try {
      const response = await fetch(
        `${AWS_LAMBDA_BASE_URL}/users/${user.email}/jobs/${documentName}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
        }
      )
      const data = await response.json()
      if (data.status === 'RUNNING') {
        return fetchJobStatus(timeout + 10000)
      } else if (data.status === 'SUCCESS') {
        console.log('Job completed successfully.')
        showSuccessToast('Job completed successfully.')
        await deleteJob(user.email, documentName, user.token)
        return 'SUCCESS'
      } else if (data.status === 'ERR') {
        showErrorToast('Job failed.', 2000)
        console.log('Job failed.')
        return 'ERR'
      } else {
        console.error('Unexpected job status:', data.status)
        return 'UNKNOWN' // Signal an unexpected job status
      }
    } catch (error) {
      console.error('Error fetching job status:', error)
      throw error // Propagate the error up
    }
  }

  return fetchJobStatus(initialTimeout)
}
