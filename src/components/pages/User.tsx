import React, { FC, useEffect, useContext } from 'react'
import GithubContext, {
  IGithubContext,
} from '../../context/github/GithubContext'
import { useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const User: FC = () => {
  const { getUser, user, loading, repos, getUserRepos } = useContext(
    GithubContext
  ) as IGithubContext
  const params = useParams<'login'>()

  useEffect(() => {
    getUser(params.login!)
    getUserRepos(params.login!)
  }, [getUser, getUserRepos, params.login])
  console.info('repose', repos)

  return !user ? <Spinner /> : <div>{user.login}</div>
}

export default User
