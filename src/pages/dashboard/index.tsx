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
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user || !token) return 
    const userData = {
      ...user,
      token
    }
    dispatch(setMongoUser(userData) as any)
    createOrUpdateUser(userData) 
    
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