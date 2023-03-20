import Head from 'next/head'
import { CallToAction } from '@/components/main/CallToAction'
import { Faqs } from '@/components/main/Faqs'
import { Footer } from '@/components/main/Footer'
import { Header } from '@/components/main/Header'
import { Hero } from '@/components/main/Hero'
import { Pricing } from '@/components/main/Pricing'
import { PrimaryFeatures } from '@/components/main/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/main/SecondaryFeatures'
import { Testimonials } from '@/components/main/Testimonials'
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
