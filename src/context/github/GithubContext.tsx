import { createContext, ReactNode, useCallback, useReducer } from 'react'
import responseType from '../../components/users/response.json'
import reposResponseType from '../../components/repos/response.json'
import githubReducer, { IActionType } from './GithubReducer'

export interface IGithubContext {
  users: Array<typeof responseType>
  user: typeof responseType
  loading: boolean
  repos: Array<typeof reposResponseType>
  dispatch: React.Dispatch<IActionType>
  clearUsers: () => void
  getUser: (login: string) => Promise<void>
  getUserRepos: (login: string) => Promise<void>
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
  const { users, loading, user, repos } = state

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

  const getUserRepos = useCallback(async (login: string) => {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: `10`,
    })

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    )
    const data = await response.json()

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }, [])

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        loading,
        dispatch,
        clearUsers,
        getUser,
        repos,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
