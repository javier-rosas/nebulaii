import {
  useUser,
  withPageAuthRequired,
  UserContext,
} from '@auth0/nextjs-auth0/client'
import { getSession } from '@auth0/nextjs-auth0'
import Upload from './Upload'
import Main from './Main'
import { GetServerSidePropsContext } from 'next'
import { authenticateUser } from '@/services/userService'
import { getMongoUser } from '@/redux/userSlice'
import { useDispatch } from 'react-redux'
import { User } from '@/types/User'
import { useEffect, useRef } from 'react'
import { createOrUpdateUser } from '@/services/userService'

function Dashboard({ user, token }: any): JSX.Element | undefined {

  const { error, isLoading }: UserContext = useUser()
  const isInitialMount = useRef(true);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user || !token) return 
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const userData = {
        ...user,
        token
      }
      dispatch(getMongoUser(userData) as any)
      createOrUpdateUser(userData) 
    }
  }, [user, token, dispatch])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <Main upload={<Upload />} />
    </div>
  )
}

export default withPageAuthRequired(Dashboard as any)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context.req, context.res)
  const user = session?.user as User
  const token = await authenticateUser(user)

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      token: JSON.parse(JSON.stringify(token)),
    },
  }
}