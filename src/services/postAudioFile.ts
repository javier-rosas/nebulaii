export async function postAudioFile(
  url: string,
  file: string | ArrayBuffer | null,
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: file,
    })
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
