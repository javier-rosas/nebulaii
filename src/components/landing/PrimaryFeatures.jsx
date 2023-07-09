import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/landing/Container'
import backgroundImage from '@/images/background-features.jpg'
import inputSources from '@/images/screenshots/inputs.webp'
import convo from '@/images/screenshots/convo.png'

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative ">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="text-center font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Talk to your data
          </h2>
          <p className="mb-4 mt-4 text-center text-lg tracking-tight text-blue-100">
            Upload your data from any source and ask questions in plain English.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="w-4/6 sm:w-1/2"
            src={inputSources}
            alt=""
            unoptimized
          />
          <Image
            className="w-4/6 rounded-lg bg-white p-4 sm:w-1/2"
            src={convo}
            alt=""
            unoptimized
          />
        </div>
      </Container>
    </section>
  )
}
