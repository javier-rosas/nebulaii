import { Fragment, useRef, useState, useEffect, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Spinner from '@/components/main/Spinner'
import { getTranscriptByUserEmailAndFilename } from '@/services/transcriptService'
import { getDiarizedTranscriptByUserEmailAndFilename } from '@/services/diarizedTranscriptService'
import { getNotesByUserEmailAndFilename } from '@/services/notesService'
import { useSelector } from 'react-redux'

export default function Popup({
  setShowTranscriptPopup,
  setShowAudioPopup,
  setShowNotesPopup,
  showTranscriptPopup,
  showNotesPopup,
  showAudioPopup,
  selectedFile,
}) {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const user = useSelector((state) => state.user.user)

  const cancelButtonRef = useRef(null)

  const closePopup = (isClosed) => {
    setShowTranscriptPopup(false)
    setShowAudioPopup(false)
    setShowNotesPopup(false)
    setOpen(isClosed)
  }

  const formatArray = (arr) => {
    if (!arr) return
    let result = ''
    for (let i = 0; i < arr.length; i++) {
      result += `<strong>Speaker ${arr[i].speakerTag}</strong>: ${arr[i].sentence}\n\n`
    }
    return result
  }

  const extractNum = (str) => {
    const numStr = str.match(/-?\d+/g)?.pop() // match the last sequence of digits
    return numStr ? parseInt(numStr) : undefined // convert to number or return undefined
  }

  const getData = useCallback(async () => {
    if (!selectedFile || !user) {
      return
    }
    const isDiarized = extractNum(selectedFile.description) > 1
    const res = await (isDiarized
      ? getDiarizedTranscriptByUserEmailAndFilename(user, selectedFile.filename)
      : getTranscriptByUserEmailAndFilename(user, selectedFile.filename))
    const notes = await getNotesByUserEmailAndFilename(
      user,
      selectedFile.filename
    )

    switch (true) {
      case showTranscriptPopup:
        const text = isDiarized ? formatArray(res.transcript) : res.transcript
        setText(text)
        setTitle('Transcript')
        break
      case showNotesPopup:
        setText(notes.notes)
        setTitle('Notes')
        break
      case showAudioPopup:
        setTitle('Audio')
        break
      default:
        break
    }
  }, [
    user,
    selectedFile,
    showTranscriptPopup,
    showNotesPopup,
    showAudioPopup,
    setTitle,
    setText,
  ])

  useEffect(() => {
    getData()
  }, [selectedFile, showNotesPopup, showTranscriptPopup, getData])

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
