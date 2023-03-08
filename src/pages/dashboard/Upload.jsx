import { useState, useEffect } from 'react'
import { postAudioFile } from '@/services/postAudioFile'
import Spinner from '@/components/Spinner'

export default function Upload() {
  const [drag, setDrag] = useState(false)
  const [file, setFile] = useState(null)
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    setFile(e.dataTransfer.files[0])
  }

  const handleFileSelect = (event) => {
    event.preventDefault()
    setFile(event.target.files[0])
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const upload = (file) => {
    getBase64(file)
      .then(() => setShowSpinner(true))
      .then((base64) =>
        postAudioFile(base64, localStorage.getItem('user_token'))
      )
      .then(() => setShowSpinner(false))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    if (!file) setShowUploadButton(false)
    else setShowUploadButton(true)
  }, [file])

  return (
    <div className="bg-white shadow sm:rounded-lg w-1/2">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Upload any video or audio file!
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Once you upload the file, our AI will transcribe and summarize it in
            minutes.
          </p>
        </div>
        {showSpinner ? (
          <Spinner />
        ) : (
          <div className="mt-5">
            <div
              className={`flex w-full items-center justify-center`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label
                for="dropzone-file"
                className={`dropzone ${
                  drag ? 'bg-indigo-600' : ''
                } h-30 dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-indigo-600`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-black">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-black">
                    MP3, MP4, WAV or M4A (MAX. 8 hours)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <h1 className="mt-2 text-base">{file?.name}</h1>
            {showUploadButton && file && (
              <div className="mt-5">
                <button
                  onClick={() => upload(file)}
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
