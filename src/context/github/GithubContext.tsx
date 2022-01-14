import { createContext, ReactNode, useCallback, useReducer } from 'react'
import responseType from '../../components/users/response.json'
import githubReducer from './GithubReducer'

export interface IGithubContext {
  users: Array<typeof responseType>
  user: typeof responseType
  loading: boolean
  searchUsers: (text: string) => Promise<void>
  clearUsers: () => void
  getUser: (login: string) => Promise<void>
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
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  const { users, loading, user } = state

  const searchUsers = useCallback(async (text: string) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const { items } = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }, [])

  const getUser = useCallback(async (login: string) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === 404) {
      window.location.href = '/notfound'
    } else {
      const data = await response.json()
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }, [])
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        loading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
