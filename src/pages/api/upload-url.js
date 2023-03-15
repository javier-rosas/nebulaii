import { Storage } from '@google-cloud/storage';
const storage = new Storage();
const bucketName = 'nebulaii-audio-files';

export default async function handler(req, res) {

  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(req.query.file)
    .getSignedUrl(options);

  // const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json({url: url});

}