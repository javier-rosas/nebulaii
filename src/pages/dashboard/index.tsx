import {
  useUser,
  withPageAuthRequired,
  UserContext,
} from '@auth0/nextjs-auth0/client'
import { getSession } from '@auth0/nextjs-auth0'
import Upload from '@/components/dashboard/upload'
import Main from '@/components/dashboard'
import { GetServerSidePropsContext } from 'next'
import { authenticateUser } from '@/services/userService'
import { setMongoUser } from '@/redux/userSlice'
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
      console.log("initial mount")
    } else {
      const userData = {
        ...user,
        token
      }
      console.log("not initial mount", userData)
      dispatch(setMongoUser(userData) as any)
      createOrUpdateUser(userData) 
    }
  }, [user, token, dispatch])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  console.log('user', user)
  console.log('user', token)

  return (
    <div>
      <Main upload={<Upload />} />
    </div>
  )
}

export default withPageAuthRequired(Dashboard as any)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("context", context)
  const session = await getSession(context.req, context.res)
  console.log("session", session)
  const user = session?.user as User
  const token = await authenticateUser(user)
  console.log("token", token)

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      token: JSON.parse(JSON.stringify(token)),
    },
  }
}