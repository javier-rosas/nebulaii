import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { resetFileState } from '@/redux/fileSlice'
import { setEnableSpeakerDiarization } from '@/redux/fileSlice'

import NumberInput from './NumberInput'
import Steps from './Steps'
import Dropdown from './Dropdown'

const questions = [
  {
    main: 'This file already exists.',
    description: "Do you want to replace it?"
  },
  {
    main: 'Do you know if the audio has more than one speaker?',
    description:
      "Our AI can transcribe and summarize audio more accurately when it knows how many speakers are involved in the conversation. If you're not sure about the exact number of speakers, simply provide your best estimate.",
  },
  {
    main: 'Which language is the audio in?',
    description: `Choose between Spanish or English`,
  },
]

export default function QuestionWithReplacement({ upload, file, setFile }) {
  const [open, setOpen] = useState(true)
  const [showNumberInput, setNumberInput] = useState(false)
  const [isUploadBtnActivated, setIsUploadBtnActivated] = useState(false)
  const [questionTextIndex, setQuestionTextIndex] = useState(0)
  const dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const closePopUp = (isClosed) => {
    setOpen(isClosed)
    setFile(null)
    dispatch(resetFileState())
  }

  const clickNext = () => {
    setQuestionTextIndex(questionTextIndex + 1)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closePopUp}
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <QuestionMarkCircleIcon
                      className="h-8 w-8 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {questions[questionTextIndex].main}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {questions[questionTextIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
                {questionTextIndex === 0 && (
                  <div className="mt-5 mb-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    {!showNumberInput && (
                     <>
                     <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={() => {
                          clickNext()
                          dispatch(setEnableSpeakerDiarization(false))
                        }}
                      >
                        Exactly 1 speaker
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={() => {
                          setNumberInput(true)
                          dispatch(setEnableSpeakerDiarization(true))
                        }}
                      >
                        More than 1 speaker
                      </button>
                      </>
                    )}

                    {showNumberInput && <NumberInput />}
                    <button
                      type="button"
                      className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => {
                        clickNext()
                        dispatch(setEnableSpeakerDiarization(false))
                      }}
                      ref={cancelButtonRef}
                    >
                      I don&apos;t know
                    </button>

                  </div>
                )}

                {questionTextIndex === 1 && (
                  <div className="mt-2 mb-5 flex justify-center">
                    <Dropdown
                      setIsUploadBtnActivated={setIsUploadBtnActivated}
                    />
                  </div>
                )}
                {!isUploadBtnActivated && questionTextIndex === 1 && (
                  <p className="m-3 flex justify-center text-red-400">
                    Choose a language before uploading.
                  </p>
                )}

                <div className="mb-10 flex justify-center">
                  {questionTextIndex === 0 && showNumberInput && (
                    <button
                      type="button"
                      onClick={() => clickNext()}
                      ref={cancelButtonRef}
                      className="mt-3 inline-flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-400 sm:col-start-1 sm:mt-0"
                    >
                      Next
                    </button>
                  )}

                  {questionTextIndex === 1 && (
                    <button
                      disabled={!isUploadBtnActivated}
                      type="button"
                      onClick={() => {upload(file); }}
                      ref={cancelButtonRef}
                      className="mt-3 inline-flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-400 sm:col-start-1 sm:mt-0"
                    >
                      Upload
                    </button>
                  )}
                </div>
                <Steps index={questionTextIndex} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
