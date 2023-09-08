import ComboBox from './ComboBox'
import { useState } from 'react'

export default function AskQuestion() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<string[]>([])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (currentQuestion.trim() !== '') {
      const userMessage = `You: ${currentQuestion}`
      const botResponse = `Bot: This is a sample response. q = ${currentQuestion}`

      // Update chatHistory with user's message and then bot's response
      setChatHistory((prevChat) => [userMessage, ...prevChat])
      setCurrentQuestion('') // Resetting the input

      // Simulate a response after a delay
      setTimeout(() => {
        setChatHistory((prevChat) => [botResponse, ...prevChat])
      }, 1000) // Delayed by 1 second for demo purposes
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="fixed top-24">
        <ComboBox
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
        />
      </div>

      {/* Wrapper for Chat and Search Bar */}
      <div className="flex flex-grow flex-col items-center justify-between">
        {/* Chat History */}
        <div className="flex w-full max-w-4xl flex-grow flex-col-reverse overflow-y-auto p-4 pb-20">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className="overflow-wrap break-word m-1 w-full break-words rounded-md bg-white p-2 shadow-sm"
            >
              {message}
            </div>
          ))}
        </div>

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
