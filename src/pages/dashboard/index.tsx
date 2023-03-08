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
    if (user) {
      dispatch(apiAuthenticateUser(user) as any)
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  console.log("rendered dashboard")
  return (
    <div>
      <Main upload={<Upload/>}/>
    </div>
  )
}

export default withPageAuthRequired(Dashboard as any)