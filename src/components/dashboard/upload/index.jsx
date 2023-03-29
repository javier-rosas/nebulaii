import { useState, useEffect, useCallback } from 'react'
import { postAudioFile } from '@/services/postAudioFile'
import { processAudioFile } from '@/services/processAudioFile'
import { useDispatch } from 'react-redux'
import { setFilename } from '@/redux/fileSlice'
import { setFileType } from '@/redux/fileSlice'
import { resetFileState } from '@/redux/fileSlice'
import { apiGetFilesByUserEmail } from '@/redux/processedFilesSlice'
import { useSelector } from 'react-redux'
import Spinner from '@/components/landing/Spinner'
import Question from './question'
import QuestionWithReplacement from './question/QuestionWithReplacement'
import Alert from './alert'

export default function Upload() {
  const [drag, setDrag] = useState(false)
  const [file, setFile] = useState(null)
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const dispatch = useDispatch()
  const fileState = useSelector((state) => state.file)
  const user = useSelector((state) => state.user.user)
  const regularList = useSelector((state) => state.processedFiles.regularList)
  const [showQuestionReplacement, setShowQuestionReplacement] = useState(false)
  const [showFileTypeAlert, setShowFileTypeAlert] = useState(false)

  const handleFileHelper = (file) => {
    if (isFileTypeValid(file)) { setShowFileTypeAlert(false); setFile(file) }
    else { setShowFileTypeAlert(true); setFile(null) }
  }

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
    const file = e.dataTransfer.files[0]
    handleFileHelper(file)
  }

  const handleFileSelect = (event) => {
    event.preventDefault()
    if (!event.target.files) return
    const file = event.target.files[0]
    handleFileHelper(file)
  }

  async function uploadAudioFile(file, email) {
    setShowSpinner(true)
    await postAudioFile(file, email)
    setFile(null)
  }

  const logFileStatus = (status) => {
    const message = status.ok
      ? 'File processed successfully.'
      : 'File could not be processed.'
    console.log(message)
  }

  const isFileTypeValid = (file) => {
    const allowedTypes = ['audio/mp3', 'audio/mp4', 'audio/wav', 'audio/m4a']
    return allowedTypes.includes(file.type)
  }

  const doesFileExist = (file) => {
    return regularList.find((item) => item.filename === file.name)
  }

  const upload = useCallback(
    async (file) => {
      if (!user || !user.email || !file) return
      try {
        await uploadAudioFile(file, user.email)
        const status = await processAudioFile(fileState, user.token)
        logFileStatus(status)
      } catch (e) {
        console.error(e)
      }
      setShowSpinner(false)
      await dispatch(resetFileState())
      await dispatch(apiGetFilesByUserEmail(user))
    },
    [user, fileState, dispatch, processAudioFile]
  )

  useEffect(() => {
    if (!file) setShowUploadButton(false)
    else {
      setShowUploadButton(true)
      dispatch(setFilename(file.name))
      dispatch(setFileType(file.type))
      if (doesFileExist(file)) setShowQuestionReplacement(true)
      else setShowQuestionReplacement(false)
    }
  }, [file, dispatch, doesFileExist])


  return (
    <div className="h-1/6 w-1/2 overflow-auto bg-white shadow sm:rounded-lg">
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
                  <p className="mb-2 text-center text-sm text-black">
                    <span className="font-semibold">Click to upload</span>
                    <br />
                    <span className="hidden md:inline-block">
                      or drag and drop
                    </span>
                  </p>
                  <p className="text-center text-xs text-black">
                    MP3, MOV, WAV or M4A (MAX. 8 hours)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  accept=".mp3,.mov,.wav,.m4a"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <h1 className="mt-2 text-base">{file?.name}</h1>
            {showFileTypeAlert && (
              <Alert setShowFileTypeAlert={setShowFileTypeAlert}/>
            )}
            {showUploadButton &&
              file &&
              (showQuestionReplacement ? (
                <QuestionWithReplacement
                  upload={upload}
                  file={file}
                  setFile={setFile}
                />
              ) : (
                <Question upload={upload} file={file} setFile={setFile} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
