import Head from 'next/head'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
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
