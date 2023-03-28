import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { apiGetFilesByUserEmail } from '@/redux/processedFilesSlice'
import { apiDeleteFileByUserEmailAndFilename } from '@/redux/processedFilesSlice'
import Spinner from '@/components/landing/Spinner'
import Popup from '@/components/dashboard/list/Popup'
import Search from './Search'

export default function List() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const processedFiles = useSelector((state) => state.processedFiles)
  const [showListSpinner, setShowListSpinner] = useState(false)
  const [showDeleteSpinner, setShowDeleteSpinner] = useState(false)
  const [showTranscriptPopup, setShowTranscriptPopup] = useState(false)
  const [showAudioPopup, setShowAudioPopup] = useState(false)
  const [showNotesPopup, setShowNotesPopup] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  /**
   * Fetches the processed files from the API
   */
  useEffect(() => {
    const fetchTranscriptsAndNotes = async () => {
      if (!user || !user.token) return
      setShowListSpinner(true)
      await dispatch(apiGetFilesByUserEmail(user))
      setShowListSpinner(false)
    }
    fetchTranscriptsAndNotes()
  }, [user, dispatch])

  return (
    <div className="mb-20 overflow-hidden bg-white shadow sm:rounded-md">
      <div className="flex flex-row justify-between">
        <h2 className="flex flex-row items-center px-4 py-4 text-2xl font-bold tracking-tight text-gray-700 sm:px-6 sm:text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-4 mr-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          Your recordings
        </h2>

        <Search styles="px-4 py-4 sm:px-6" />
      </div>
      {showListSpinner ? (
        <Spinner />
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {processedFiles &&
            processedFiles.filteredList?.map((processedFile) => (
              <li key={processedFile.filename}>
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div className="mb-5">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {processedFile.filename}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="truncate">
                            {processedFile.description}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-center sm:ml-20 sm:justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setShowTranscriptPopup(true)
                            setSelectedFile(processedFile)
                          }}
                          className="h-12 w-28  rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Transcript
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowNotesPopup(true)
                            setSelectedFile(processedFile)
                          }}
                          className="h-12 w-28 rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Notes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAudioPopup(true)
                            setSelectedFile(processedFile)
                          }}
                          className="h-12 w-28 rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Audio
                        </button>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            <time dateTime={processedFile.dateAdded}>
                              {processedFile.dateAdded}
                            </time>
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            Completed audio processing.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center sm:justify-end">
                        {showDeleteSpinner ? (
                          <Spinner styles={`mt-2`} />
                        ) : (
                          <button
                            type="button"
                            onClick={async () => {
                              setShowDeleteSpinner(true)
                              await dispatch(
                                apiDeleteFileByUserEmailAndFilename({
                                  user,
                                  filename: processedFile.filename,
                                })
                              )
                              setShowDeleteSpinner(false)
                            }}
                            className="mt-2 h-12 w-28 rounded-md bg-red-600 px-1 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {(showTranscriptPopup || showNotesPopup || showAudioPopup) && (
                  <Popup
                    setShowAudioPopup={setShowAudioPopup}
                    showAudioPopup={showAudioPopup}
                    showTranscriptPopup={showTranscriptPopup}
                    showNotesPopup={showNotesPopup}
                    setShowNotesPopup={setShowNotesPopup}
                    setShowTranscriptPopup={setShowTranscriptPopup}
                    selectedFile={selectedFile}
                  />
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
