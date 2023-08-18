const generateSignedUrl = async (
  file: File,
  userEmail: string,
  documentName: string
) => {
  try {
    const fileName = `${userEmail}/${documentName}/${file.name}`
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
    return data.url
  } catch (error) {
    console.error('Error while generating signed URL:', error)
  }
}

export async function postDocument(
  file: File,
  userEmail: string,
  documentName: string
) {
  try {
    const signedUrl = await generateSignedUrl(file, userEmail, documentName)
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
  } catch (error) {
    console.error('Error while uploading file:', error)
  }
}
