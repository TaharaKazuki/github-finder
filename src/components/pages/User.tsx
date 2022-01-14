import React, { FC, useEffect, useContext } from 'react'
import GithubContext, {
  IGithubContext,
} from '../../context/github/GithubContext'
import { useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const User: FC = () => {
  const { getUser, user } = useContext(GithubContext) as IGithubContext
  const params = useParams<'login'>()

  useEffect(() => {
    getUser(params.login!)
  }, [getUser, params.login])

  return !user ? <Spinner /> : <div>{user.login}</div>
}

export default User
