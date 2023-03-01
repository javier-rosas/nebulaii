import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'
import Link from 'next/link'

function Dashboard(): any {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && user.picture && user.name && (
      <div>
        <Image src={user.picture} alt={user.name} width={500} height={500} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href="/api/auth/logout">Logout</Link>
      </div>
      
    )
  );
}

export default withPageAuthRequired(Dashboard);
