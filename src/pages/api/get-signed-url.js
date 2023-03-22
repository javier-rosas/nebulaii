import { Storage } from '@google-cloud/storage'
const storage = new Storage({
  projectId: process.env.project_id,
  credentials: {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    }
})

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
