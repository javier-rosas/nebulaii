// This function generates a signed URL for a file to be uploaded to S3.
const generateSignedUrl = async (file: File, userEmail: string) => {
  try {
    const fileName = `${userEmail}/${file.name}`
    const response = await fetch('/api/get-signed-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        fileType: file.type,
      }),
    })
    if (!response.ok) {
      throw new Error(
        'Failed to get generate signed url. Please try again later.'
      )
    }
    const data = await response.json()
    return data.signedUrl
  } catch (error) {
    console.error('Error while generating signed URL:', error)
  }
}

export async function putDocInS3(file: File, userEmail: string) {
  try {
    const signedUrl = await generateSignedUrl(file, userEmail)
    if (!signedUrl) throw new Error('Failed to post doc. Signed URL is empty.')
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    }
    const response = await fetch(signedUrl, requestOptions)
    if (!response.ok) {
      throw new Error('Failed to post audio file. Please try again later.')
    }
    return response.ok
  } catch (error) {
    console.error('Error while uploading file:', error)
  }
}
