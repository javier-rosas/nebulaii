import { useRouter } from 'next/router'

export default function Logo(props) {
  const router = useRouter()

  if (router.pathname === '/') {
    // You are in the about page
    return (
      <div className="flex flex-row items-center	">
        <svg aria-hidden="true" viewBox="0 0 60 40" {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36Z"
            fill="#2563EB"
          />
        </svg>
        <h1 className="text-center font-display font-medium tracking-tight text-slate-900">
          Nebulaii
        </h1>
      </div>
    )
  } else if (router.pathname === '/dashboard') {
    // You are in the dashboard page
    return (
      <div className="flex flex-row items-center	">
        <svg aria-hidden="true" viewBox="0 0 60 40" {...props}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36Z"
            fill="#FFFFFF"
          />
        </svg>
        <h1 className="text-center font-display font-medium tracking-tight text-white">
          Nebulaii
        </h1>
      </div>
    )
  } else {
    return null // or return a default logo if you want
  }
}
