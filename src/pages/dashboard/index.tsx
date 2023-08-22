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
import { User } from '@/types/User'
import { useEffect } from 'react'
import { createOrUpdateUser } from '@/services/userService'

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
