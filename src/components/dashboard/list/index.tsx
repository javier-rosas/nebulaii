import { deleteDocument, setDocuments } from '@/redux/processedDocumentSlice'
import {
  deleteDocumentByUserEmailAndDocumentName,
  getDocumentsByUserEmail,
} from '@/services/documentService'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import { ProcessedDocumentPayload } from '@/types/ProcessedDocuments'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Search from './Search'
// import Popup from '@/components/dashboard/list/Popup'
import Spinner from '@/components/landing/Spinner'
import useLocalStorageUser from '@/hooks/useLocalStorageUser'

export default function List() {
  const dispatch = useDispatch()
  const processedDocuments = useSelector(
    (state: RootState) => state.processedDocuments
  )

  const listSpinner = useSelector(
    (state: RootState) => state.listSpinner.listSpinner
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
      const documents = await getDocumentsByUserEmail(user)
      dispatch(setDocuments(documents))
      setShowListSpinner(false)
    }
    fetchDocuments()
  }, [])

  const handleDelete = async (documentName: string) => {
    setDeletingFile(documentName)
    await deleteDocumentByUserEmailAndDocumentName(user, documentName)
    dispatch(deleteDocument(documentName))
    setDeletingFile(null)
  }
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
          Your Documents
        </h2>
        <Search styles="px-4 py-4 sm:px-6" />
      </div>
      {showListSpinner || listSpinner ? (
        <Spinner />
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {(processedDocuments?.filteredList || []).map(
            (processedDocument, index) => (
              <li key={index}>
                <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                  {/* Document Details */}
                  <div className="flex flex-col">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {processedDocument.documentName}
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <span className="truncate">
                        {processedDocument.description}
                      </span>
                    </p>
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

                  {/* Buttons */}
                  <div className="flex flex-col items-center space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDocumentPopup(true)
                        setSelectedFile(processedDocument)
                      }}
                      className="h-12 w-28 rounded-md bg-white px-1 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                    >
                      Document
                    </button>
                    {deletingFile === processedDocument.documentName ? (
                      <Spinner styles={`mt-2`} />
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(processedDocument.documentName)
                        }
                        className="mt-2 h-12 w-28 rounded-md bg-red-600 px-1 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white sm:col-start-1 sm:mt-0"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* {showDocumentPopup && (
                  <Popup
                    showDocumentPopup={showDocumentPopup}
                    setShowDocumentPopup={setShowDocumentPopup}
                    selectedFile={selectedFile}
                  />
                )} */}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}
