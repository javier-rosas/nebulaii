import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDocuments, deleteDocument } from '@/redux/processedDocumentSlice'
import {
  getDocumentsByUserEmail,
  deleteDocumentByUserEmailAndDocumentName,
} from '@/services/documentService'
import useLocalStorageUser from '@/hooks/useLocalStorageUser'
import Spinner from '@/components/landing/Spinner'
import Popup from '@/components/dashboard/list/Popup'
import Search from './Search'
import { RootState } from '@/redux/store'
import { ProcessedDocumentPayload } from '@/types/ProcessedDocuments'

export default function List() {
  const dispatch = useDispatch()
  const processedDocuments = useSelector(
    (state: RootState) => state.processedDocuments
  )
  const [showListSpinner, setShowListSpinner] = useState(false)
  const [deletingFile, setDeletingFile] = useState<string | null>(null)
  const [showDocumentPopup, setShowDocumentPopup] = useState(false)
  const [selectedFile, setSelectedFile] =
    useState<ProcessedDocumentPayload | null>(null)
  const user = useLocalStorageUser()
  /**
   * Fetches the processed files from the API
   */
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user || !user.token) return
      setShowListSpinner(true)
      const files = await getDocumentsByUserEmail(user)
      dispatch(setDocuments(files))
      setShowListSpinner(false)
    }
    fetchDocuments()
  }, [user])

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
          {(processedDocuments?.filteredList || []).map(
            (processedDocument, index) => (
              <li key={index}>
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div className="mb-5">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {processedDocument.documentName}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="truncate">
                            {processedDocument.description}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-center sm:ml-20 sm:justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setShowDocumentPopup(true)
                            setSelectedFile(processedDocument)
                          }}
                          className="h-12 w-28  rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                        >
                          Document
                        </button>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            <time dateTime={processedDocument.dateAdded}>
                              {processedDocument.dateAdded}
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
                        {deletingFile === processedDocument.documentName ? (
                          <Spinner styles={`mt-2`} />
                        ) : (
                          <button
                            type="button"
                            onClick={async () => {
                              setDeletingFile(processedDocument.documentName)
                              await deleteDocumentByUserEmailAndDocumentName(
                                user,
                                processedDocument.documentName
                              )
                              dispatch(
                                deleteDocument(processedDocument.documentName)
                              )
                              setDeletingFile(null)
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
                {showDocumentPopup && (
                  <Popup
                    showDocumentPopup={showDocumentPopup}
                    setShowDocumentPopup={setShowDocumentPopup}
                    selectedFile={selectedFile}
                  />
                )}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}
