const generateSignedUrl = async (file: File, userEmail: string) => {
  const response = await fetch('/api/get-signed-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      fileName: file.name, 
      contentType: file.type,
      userEmail
    }),
  })
  if (response.ok) {
    const data = await response.json()
    return data.url
  } else {
    throw new Error('Error generating signed URL')
  }
}

export async function postAudioFile(file: File, userEmail: string) {
  try {
    const signedUrl = await generateSignedUrl(file, userEmail)
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    }
    const response = await fetch(signedUrl, requestOptions)
    if (response.ok) {
      console.log('File uploaded successfully')
    } else {
      console.log('File upload failed:', response.statusText)
    }
  } catch (error) {
    console.error('Error while uploading file:', error)
  }
}
