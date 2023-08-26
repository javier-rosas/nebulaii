import { Fragment, useRef, useState, useEffect, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getDocumentByUserEmailAndDocumentName } from '@/services/documentService'
import Spinner from '@/components/landing/Spinner'
import useLocalStorageUser from '@/hooks/useLocalStorageUser'

export default function Popup({
  setShowDocumentPopup,
  showDocumentPopup,
  selectedFile,
}) {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const user = useLocalStorageUser()

  const cancelButtonRef = useRef(null)

  const closePopup = (isClosed) => {
    setShowDocumentPopup(false)
    setOpen(isClosed)
  }

  const handlePopupShow = (res) => {
    switch (true) {
      case showDocumentPopup:
        const text = res.document
        setText(text)
        setTitle('Document')
        break
      default:
        break
    }
  }

  const getData = async () => {
    if (!selectedFile || !user) {
      return
    }
    const res = await getDocumentByUserEmailAndDocumentName(
      user,
      selectedFile.filename
    )
    handlePopupShow(res)
  }

  useEffect(() => {
    getData()
  }, [selectedFile, showDocumentPopup, getData])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closePopup}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-5">
                      {text ? (
                        <p
                          className="text-left text-sm text-black"
                          dangerouslySetInnerHTML={{
                            __html: text.replace(/\n/g, '<br>'),
                          }}
                        ></p>
                      ) : (
                        <div className="ml-2 flex justify-center">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
