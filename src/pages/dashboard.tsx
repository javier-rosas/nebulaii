import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { apiAuthenticateUser } from '@/redux/userSlice'

function Dashboard(): JSX.Element | undefined {
  const { user, error, isLoading } = useUser()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem('user_token') && user) {
      dispatch(apiAuthenticateUser(user) as any)
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!user || !user.name) return

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  )
}

export default withPageAuthRequired(Dashboard as any)