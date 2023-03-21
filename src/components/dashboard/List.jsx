import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { apiGetProcessedFiles } from '@/redux/processedFilesSlice'
import Spinner from '@/components/main/Spinner'

export default function List() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const processedFiles = useSelector((state) => state.processedFiles)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    const fetchTranscriptsAndNotes = async () => {
      if (!user || !user.token) return
      setShowSpinner(true)
      await dispatch(apiGetProcessedFiles(user))
      setShowSpinner(false)
    }
    fetchTranscriptsAndNotes()
  }, [user])

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {showSpinner ? (
        <Spinner />
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {processedFiles &&
            processedFiles.map((processedFile) => (
              <li key={processedFile.filename}>
                {/* <a href={application.href} className="block hover:bg-gray-50"> */}
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {processedFile.filename}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="truncate">
                            {processedFile.description}
                          </span>
                        </p>
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
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                {/* </a> */}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
