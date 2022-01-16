import { createContext, ReactNode, useReducer } from 'react'
import responseType from '../../components/users/response.json'
import reposResponseType from '../../components/repos/response.json'
import githubReducer, { IActionType } from './GithubReducer'

export interface IGithubContext {
  users: Array<typeof responseType>
  user: typeof responseType
  loading: boolean
  repos: Array<typeof reposResponseType>
  dispatch: React.Dispatch<IActionType>
}

interface Props {
  children: ReactNode
}

const GithubContext = createContext<IGithubContext | undefined>(undefined)

export const GithubProvider = (props: Props) => {
  const { children } = props
  const initialState = {
    users: [] as Array<typeof responseType>,
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  const { users, loading, user, repos } = state

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        loading,
        dispatch,
        repos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
