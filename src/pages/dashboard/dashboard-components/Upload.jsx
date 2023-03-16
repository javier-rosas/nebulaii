import { useState, useEffect } from 'react'
import { postAudioFile } from '@/services/postAudioFile'
import { useDispatch } from 'react-redux'
import { setFilename } from '@/redux/fileSlice'
import Spinner from '@/components/Spinner'
import Question from './Question'
import { useSelector } from 'react-redux'

export default function Upload() {
  const [drag, setDrag] = useState(false)
  const [file, setFile] = useState(null)
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const dispatch = useDispatch()
  const fileState = useSelector((state) => state.file)
  const user = useSelector((state) => state.user.user)


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
    if (!e.dataTransfer) return
    setFile(e.dataTransfer.files[0])
  }

  const handleFileSelect = (event) => {
    event.preventDefault()
    if (!event.target.files) return
    setFile(event.target.files[0])
  }

  const upload = async (file) => {
    if (!user || !user.email || !file) return 
    setShowSpinner(true)
    postAudioFile(file, user.email)
      .then(() => { setShowSpinner(false); setFile(null) })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    if (!file) setShowUploadButton(false)
    else { setShowUploadButton(true); dispatch(setFilename(file.name)) }
  }, [file])

  return (
    <div className="bg-white shadow sm:rounded-lg w-1/2 h-1/6 overflow-auto">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Upload any audio file!
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
                htmlFor="dropzone-file"
                className={`dropzone ${
                  drag ? 'bg-indigo-600' : ''
                } h-30 dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-indigo-600`}
              >
                <div className="flex flex-col items-center justify-center p-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-black text-center">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-black text-center">
                    MP3, MP4, WAV or M4A (MAX. 8 hours)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  accept=".mp3,.mp4,.wav,.m4a"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <h1 className="mt-2 text-base">{file?.name}</h1>
            {showUploadButton && file && (
              <Question upload={upload} file={file} setFile={setFile}/>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
