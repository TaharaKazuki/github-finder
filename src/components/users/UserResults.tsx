import React, { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
// types
import responseType from './response.json'

const UserResults = () => {
  const [users, setUsers] = useState<Array<typeof responseType>>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()
    console.info(JSON.stringify(data))
    setUsers(data)
    setLoading(false)
  }

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 text-gray-400">
        {users.map((user, index) => (
          <h3 key={index}>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
