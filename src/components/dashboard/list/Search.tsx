import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { filterFiles } from '@/redux/processedFilesSlice'


type StyleProps = {
  styles: string
}

export default function Search({ styles }: StyleProps) {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const regularList = useSelector(
    (state: RootState) => state.processedFiles.regularList
  )

  // Returns a filtered list of files based on the query
  const filteredList =
    query === ''
      ? []
      : regularList.filter((file) => {
          return file.filename.toLowerCase().includes(query.toLowerCase())
        })

  useEffect(() => {
    if (!query) return
    dispatch(filterFiles(filteredList))
  }, [query])

  return (
    <div className={styles}>
      <Combobox>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            onChange={(event) => {
              setQuery(event.target.value)
            }}
          />
        </div>
        {query !== '' && filteredList.length === 0 && (
          <p className="p-1 text-sm text-gray-500">No recordings found.</p>
        )}
      </Combobox>
    </div>
  )
}
