import responseType from '../../components/users/response.json'

interface IActionType {
  type: 'GET_USERS' | 'SET_LOADING' | 'CLEAR_USERS' | 'GET_USER'
  payload?: any
}

interface IState {
  users: Array<typeof responseType>
  user?: typeof responseType
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
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
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
