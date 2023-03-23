import Head from 'next/head'
import { CallToAction } from '@/components/landing/CallToAction'
import { Faqs } from '@/components/landing/Faqs'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Pricing } from '@/components/landing/Pricing'
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures'
import { Testimonials } from '@/components/landing/Testimonials'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { UserContext } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'

export default function Home() {
  const { user }: UserContext = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Nebulaii - AI note taker. </title>
        <meta
          name="description"
          content="Our AI is so good, it's like having a personal secretary that never takes a coffee break"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
