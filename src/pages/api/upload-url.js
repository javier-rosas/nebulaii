import { Storage } from '@google-cloud/storage'
const storage = new Storage()
const bucketName = 'nebulaii-audio-files'

// Generate signed URL
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName, contentType } = req.body

    try {
      const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: contentType,
      }

      const signedUrl = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl(options)

      res.status(200).json({ url: signedUrl[0] })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error generating signed URL' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
