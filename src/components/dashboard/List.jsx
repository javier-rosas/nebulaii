import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { apiGetProcessedFiles } from '@/redux/processedFilesSlice'
import Spinner from '@/components/main/Spinner'
import Popup from '@/components/dashboard/list/Popup'

export default function List() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const processedFiles = useSelector((state) => state.processedFiles)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showTranscriptPopup, setShowTranscriptPopup] = useState(false)
  const [showAudioPopup, setShowAudioPopup] = useState(false)
  const [showNotesPopup, setShowNotesPopup] = useState(false)
  const [selectedFile, setSelectedFile] = useState('') // add state for selected file


  /**
   * Fetches the processed files from the API
   */
  useEffect(() => {
    const fetchTranscriptsAndNotes = async () => {
      if (!user || !user.token) return
      setShowSpinner(true)
      await dispatch(apiGetProcessedFiles(user))
      setShowSpinner(false)
    }
    fetchTranscriptsAndNotes()
  }, [user])

  /**
   * Renders the list of processed files
   */
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {showSpinner ? (
        <Spinner />
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {processedFiles &&
            processedFiles.map((processedFile) => (
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

                      <div className="sm:ml-20 flex sm:justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setShowTranscriptPopup(true)
                            setSelectedFile(processedFile.filename)
                          }}
                          className="h-12 w-28  rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Transcript
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowNotesPopup(true)
                            setSelectedFile(processedFile.filename)
                          }}
                          className="h-12 w-28 rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Notes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAudioPopup(true)
                            setSelectedFile(processedFile.filename)
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
                      <div className="flex sm:justify-end justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            console.log('Button Clicked')
                          }}
                          className="mt-2 h-12 w-28 rounded-md bg-red-600 px-1 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Delete
                        </button>
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
                    processedFiles={processedFiles}
                    filename={selectedFile}
                  />
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
