import {
  UserContext,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0/client'

import { GetServerSidePropsContext } from 'next'
import Main from '@/components/dashboard'
import Upload from '@/components/dashboard/upload'
import { User } from '@/types/User'
import { authenticateUser } from '@/services/userService'
import { createOrUpdateUser } from '@/services/userService'
import { getSession } from '@auth0/nextjs-auth0'
import { useEffect } from 'react'

function Dashboard({ user }: any): JSX.Element | undefined {
  const { error, isLoading }: UserContext = useUser()

  useEffect(() => {
    if (!user) return
    // Set the token in local storage
    localStorage.setItem('user', JSON.stringify(user))
    createOrUpdateUser(user)
  }, [user])

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
  user.token = token
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
