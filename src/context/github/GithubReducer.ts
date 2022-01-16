import responseType from '../../components/users/response.json'

export interface IActionType {
  type: 'GET_USERS' | 'SET_LOADING' | 'CLEAR_USERS' | 'GET_USER_AND_REPOS'
  payload?: any
}

interface IState {
  users: Array<typeof responseType>
  user?: typeof responseType
  repos?: Array<any>
  loading: boolean
}

const githubReducer = (state: IState, action: IActionType) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}

export default githubReducer
