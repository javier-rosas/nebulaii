import { S3 } from 'aws-sdk'

const AWS_BUCKET = process.env.AWS_BUCKET
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const AWS_REGION = process.env.AWS_REGION

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
})

// Generate signed URL
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fileName, fileType } = req.body
      if (!fileName || !fileType) {
        return res
          .status(400)
          .json({ error: 'fileName and fileType are required' })
      }
      const params = {
        Bucket: AWS_BUCKET,
        Key: fileName,
        Expires: 60 * 5, // URL will be valid for 5 minutes
        ContentType: fileType,
        // ACL: 'public-read', // If you want the uploaded file to be publicly accessible
      }
      s3.getSignedUrl('putObject', params, (error, url) => {
        if (error) {
          return res
            .status(500)
            .json({ error: 'Failed to generate signed URL' })
        }
        res.status(200).json({ signedUrl: url })
      })
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
