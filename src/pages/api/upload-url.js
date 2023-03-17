import { Storage } from '@google-cloud/storage'
const storage = new Storage()
const bucketName = process.env.GCP_BUCKET_NAME

// Generate signed URL
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName, contentType, userEmail } = req.body

    try {
      const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 10000 * 60 * 1000, // 10,000 minutes or 7 days (max)
        contentType: contentType,
      }

      const signedUrl = await storage
        .bucket(bucketName)
        .file(`${userEmail}/${fileName}`)
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
