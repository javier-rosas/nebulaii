import {
  resetDocumentState,
  setDocumentName,
  setDocumentType,
} from '@/redux/documentSlice'
import { checkForJobCompletion, startJob } from '@/services/jobService'
import {
  allowedFileExtensionsStr,
  allowedMimeTypesList,
} from '@/utils/constants'
import { useEffect, useState } from 'react'

import List from '@/components/dashboard/list'
import Spinner from '@/components/landing/Spinner'
import useLocalStorageUser from '@/hooks/useLocalStorageUser'
import { setListSpinner } from '@/redux/listSpinnerSlice'
import { setDocuments } from '@/redux/processedDocumentSlice'
import { getDocumentsByUserEmail } from '@/services/documentService'
import { putDocInS3 } from '@/services/putDocInS3'
import { DocumentState } from '@/types/DocumentState'
import { useDispatch } from 'react-redux'
import Alert from './alert'

export default function Upload() {
  const [drag, setDrag] = useState(false)
  const [document, setDocument] = useState<DocumentState | null>(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const dispatch = useDispatch()
  const [file, setFile] = useState<File | null>(null)
  const user = useLocalStorageUser()
  const [showFileTypeAlert, setShowFileTypeAlert] = useState(false)

  // Check if file type is valid
  const handleFileHelper = (document: DocumentState) => {
    if (isFileTypeValid(document)) {
      setShowFileTypeAlert(false)
      setDocument(document)
    } else {
      setShowFileTypeAlert(true)
      setDocument(null)
    }
  }

  // Prevent default behavior
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
  }

  // Reset drag state
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
  }

  // Prevent default behavior
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // Convert file to document state
  const fileToDocumentState = (file: File): DocumentState => ({
    documentName: file.name,
    description: '',
    dateAdded: Date.now(),
    documentType: file.type,
  })

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    const droppedFile = e.dataTransfer?.files[0]
    setFile(droppedFile)
    if (droppedFile) {
      handleFileHelper(fileToDocumentState(droppedFile))
    }
  }

  // Handle file select
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    if (selectedFile) {
      handleFileHelper(fileToDocumentState(selectedFile))
    }
  }

  // Check if file type is valid
  const isFileTypeValid = (file: DocumentState) => {
    const allowedTypes = allowedMimeTypesList()
    return file.documentType ? allowedTypes.includes(file.documentType) : false
  }

  // Upload file to S3 and start job
  const upload = async (file: File) => {
    if (!user || !user.email || !file) return
    setShowSpinner(true)
    await putDocInS3(file, user.email)
    setDocument(null)
    await startJob(user.email, file.name, user.token)
    setShowSpinner(false)
    dispatch(resetDocumentState())
    dispatch(setListSpinner(true))
    const jobStatus = await checkForJobCompletion(user, file.name)
    if (jobStatus === 'SUCCESS' || jobStatus === 'ERR') {
      const files = await getDocumentsByUserEmail(user)
      dispatch(setListSpinner(false))
      await dispatch(setDocuments(files))
    }
  }

  // Upload file when document and file are set
  useEffect(() => {
    if (!document || !file) return
    dispatch(setDocumentName(document.documentName))
    dispatch(setDocumentType(document.documentType))
    upload(file)
  }, [document, file])

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-1/6 w-1/2 overflow-auto bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Upload any audio file!
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Once you upload the file, our AI will process it seconds.</p>
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
                    <p
                      className="hidden overflow-hidden truncate text-center text-xs text-black md:block"
                      style={{ textOverflow: 'ellipsis' }}
                    >
                      {allowedFileExtensionsStr()}
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    accept={allowedFileExtensionsStr()}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
              <h1 className="mt-2 text-base">{document?.documentName}</h1>
              {showFileTypeAlert && (
                <Alert setShowFileTypeAlert={setShowFileTypeAlert} />
              )}
            </div>
          )}
        </div>
      </div>
      {/* List Component */}
      <div className="mt-6 w-full">
        <List />
      </div>
    </div>
  )
}
