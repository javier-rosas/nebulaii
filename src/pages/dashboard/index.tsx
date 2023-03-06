import { useUser, withPageAuthRequired, UserContext } from '@auth0/nextjs-auth0/client'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { apiAuthenticateUser } from '@/redux/userSlice'
import Upload from './Upload'
import Main from './Main'

function Dashboard(): JSX.Element | undefined {

  const { user, error, isLoading }: UserContext = useUser()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem('user_token') && user) {
      dispatch(apiAuthenticateUser(user) as any)
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <Main upload={<Upload/>}/>
    </div>
  )
}

export default withPageAuthRequired(Dashboard as any)