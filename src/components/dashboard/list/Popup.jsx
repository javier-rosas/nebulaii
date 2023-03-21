import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Popup({
  setShowTranscriptPopup,
  setShowAudioPopup,
  setShowNotesPopup,
  showTranscriptPopup,
  showNotesPopup,
  showAudioPopup,
  processedFiles,
  filename,
}) {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const cancelButtonRef = useRef(null)

  const closePopup = (isClosed) => {
    setShowTranscriptPopup(false)
    setShowAudioPopup(false)
    setShowNotesPopup(false)
    setOpen(isClosed)
  }

  function formatArray(arr) {
    let result = ''
    for (let i = 0; i < arr.length; i++) {
      result += `<strong>Speaker ${arr[i].speakerTag}</strong>: ${arr[i].sentence}\n\n`
    }
    return result
  }

  useEffect(() => {
    const file = processedFiles.find(
      (processedFile) => processedFile.filename === filename
    )
    if (showTranscriptPopup) {
      const text = file.transcript
        ? file.transcript
        : formatArray(file.diarizedTranscript)
      setTitle('Transcript')
      setText(text)
    } else if (showNotesPopup) {
      setTitle('Notes')
      setText(file.notes)
    }
  }, [processedFiles, showNotesPopup, showTranscriptPopup])

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
                        <p
                          className="text-left text-sm text-black"
                          dangerouslySetInnerHTML={{
                            __html: text.replace(/\n/g, '<br>'),
                          }}
                        ></p>
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
