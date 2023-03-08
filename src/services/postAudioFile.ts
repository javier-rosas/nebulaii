const postAudioFileApi = process.env.NEXT_PUBLIC_AWS_POST_AUDIO_FILE_API

export async function postAudioFile(
  file: string | ArrayBuffer | null,
  token: string
) {
  try {
    const response = await fetch(`${postAudioFileApi}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ event: `${file}` }),
    })
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
