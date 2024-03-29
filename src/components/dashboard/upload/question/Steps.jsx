const stepsWithoutReplacement = [
  { id: 'Step 1', name: 'Number of speakers', status: 0 },
  { id: 'Step 2', name: 'Choose Language', status: 1 },
]

const stepsWithReplacement = [
  { id: 'Step 1', name: 'File Replacement', status: 0 },
  { id: 'Step 2', name: 'Number of speakers', status: 1 },
  { id: 'Step 2', name: 'Choose Language', status: 2 },
]

export default function Steps({index, showReplacementPannel}) {

  const steps = showReplacementPannel ? stepsWithReplacement : stepsWithoutReplacement
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === index ? (
              <div
                className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : step.status === index ? (
              <div
                className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-indigo-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
