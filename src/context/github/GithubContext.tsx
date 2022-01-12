import { createContext, ReactNode, useCallback, useReducer } from 'react'
import responseType from '../../components/users/response.json'
import githubReducer from './GithubReducer'

export interface IGithubContext {
  users: Array<typeof responseType>
  loading: boolean
  fetchUsers: () => Promise<void>
}

interface Props {
  children: ReactNode
}

const GithubContext = createContext<IGithubContext | undefined>(undefined)
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = (props: Props) => {
  const { children } = props
  const initialState = {
    users: [] as Array<typeof responseType>,
    loading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  const { users, loading } = state
  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }, [])

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
