import {
  addMessageToChat,
  createOrUpdateChat,
  getChat,
  search,
} from '@/services/chatService'
import { useEffect, useRef, useState } from 'react'

import Spinner from '@/components/landing/Spinner'
import useLocalStorageUser from '@/hooks/useLocalStorageUser'
import ComboBox from './ComboBox'

type Chat = {
  message: string
  isBot: boolean
}

export default function AskQuestion() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<Chat[]>([])
  const ref = useRef<HTMLDivElement | null>(null)
  const user = useLocalStorageUser()
  const [spinner, setSpinner] = useState<boolean>(false)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!user || !selectedDocument || currentQuestion.trim() === '') return

    const userMessage: Chat = {
      message: `You: ${currentQuestion}`,
      isBot: false,
    }

    const userMessageRes = await addMessageToChat(
      user,
      selectedDocument,
      userMessage
    )
    if (!userMessageRes._id) console.log("Couldn't add message to chat")

    // Update chatHistory with user's message and then bot's response
    setChatHistory((prevChat) => [userMessage, ...prevChat])
    setCurrentQuestion('') // Resetting the input

    setSpinner(true)
    const response = await search(user, selectedDocument, currentQuestion)
    const botResponse: Chat = {
      message: `Bot: ${response}`,
      isBot: true,
    }
    setSpinner(false)
    setChatHistory((prevChat) => [botResponse, ...prevChat])
    const botMessageRes = await addMessageToChat(
      user,
      selectedDocument,
      botResponse
    )
    console.log(botMessageRes)
  }

  useEffect(() => {
    const lastChildElement = ref.current?.lastElementChild
    lastChildElement?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  useEffect(() => {
    const fetchChat = async () => {
      if (!user || !selectedDocument) return
      const chat = await getChat(user, selectedDocument)
      if (chat === null) {
        await createOrUpdateChat(user, selectedDocument)
      } else {
        const reversedChat = chat.chat.reverse()
        setChatHistory(reversedChat)
      }
    }
    setSpinner(true)
    fetchChat()
    setSpinner(false)
  }, [selectedDocument])

  return (
    <div className="flex h-screen flex-col">
      <div>
        <ComboBox
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
        />
      </div>

      {/* Wrapper for Chat and Search Bar */}
      <div className="flex flex-grow flex-col items-center justify-between">
        {/* Chat History */}
        {spinner ? (
          <Spinner />
        ) : (
          <div
            ref={ref}
            className="flex w-full max-w-xs flex-grow flex-col-reverse overflow-y-auto p-4 pb-20 sm:max-w-4xl"
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`
                overflow-wrap break-word m-1 w-full break-words rounded-md p-2 shadow-sm 
                ${message.isBot ? 'bg-blue-200' : 'bg-gray-200'}
            `}
              >
                {message.message}
              </div>
            ))}
          </div>
        )}
        {/* Text Area and Button */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-4xl bg-white p-4 shadow-md lg:left-64">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between"
          >
            <textarea
              rows={2}
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              name="comment"
              id="comment"
              className="mx-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Ask a question..."
            />
            <button
              type="submit"
              className="ml-2 inline-flex items-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
