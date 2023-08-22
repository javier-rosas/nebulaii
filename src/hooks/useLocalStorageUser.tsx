import { useMemo } from 'react'

function useLocalStorageUser() {
  const userString = localStorage.getItem('user')

  const user = useMemo(() => {
    if (userString) return JSON.parse(userString)
    return null
  }, [userString])

  return user
}

export default useLocalStorageUser
