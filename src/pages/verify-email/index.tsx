import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <div className="bg-white flex justify-center">
      <div className="mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Check your email for a verification link.
          <br />
          Once you have verified, login with the link below.
        </h2>
        <div className="mt-10 flex items-center gap-x-6">
          <Link
            href="/api/v1/auth/login"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}