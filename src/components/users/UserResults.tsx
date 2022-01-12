import React, { useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
// context
import GithubContext, {
  IGithubContext,
} from '../../context/github/GithubContext'

const UserResults = () => {
  const { users, loading, fetchUsers } = useContext(
    GithubContext
  ) as IGithubContext

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 text-gray-400">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
