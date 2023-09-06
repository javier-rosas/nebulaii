import ComboBox from './ComboBox'

export default function AskQuestion() {
  return (
    <div className="flex h-screen flex-col">
      {/* ComboBox */}
      <div className="flex justify-center p-4 lg:justify-start">
        <ComboBox />
      </div>

      <div className="flex-grow"></div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md lg:left-64">
        <form action="#" className="flex items-center justify-between">
          <textarea
            rows={2}
            name="comment"
            id="comment"
            className="mx-2 block w-1/2 flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Ask a question..."
            defaultValue={''}
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
  )
}
