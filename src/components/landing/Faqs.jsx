import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/landing/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'What should my data look like?',
      answer:
        'You can upload one or multiple files in 1 datastore (PDF, CSV, JSON, Text, PowerPoint, Word, Excel), or add a link to your website to be scraped. 1 chatbot is associated with 1 datastore.',
    },
    {
      question: 'Does it use ChatGPT?',
      answer:
        'Yes, your chatbot uses ChatGPT (gpt-4). We are planning to support other models in the future.',
    },
    {
      question: 'Where is my data stored?',
      answer:
        'The content of the documents is hosted on secure AWS servers in Virginia, USA.',
    },
  ],
  [
    {
      question: 'Does it support other languages?',
      answer:
        'Yes, Nebulaii supports Spanish and English. You can have your sources in any language and ask it questions in any language.',
    },
    {
      question: 'How can I add my chatbot to my website?',
      answer:
        'You can embed an iframe or add a chat bubble to the bottom right/left of your website.',
    },
    {
      question: 'Can I give my chatbots instructions?',
      answer:
        'Yes, you can edit the base prompt and give your chatbot a name, personality traits and instructions on how to answer questions ex. (only answer in French).',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you:{' '}
            <Link className="text-indigo-500" href="mailto:javier@nebulaii.com">
              javier@nebulaii.com
            </Link>
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
