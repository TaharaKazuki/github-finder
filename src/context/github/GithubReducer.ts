import responseType from '../../components/users/response.json'

interface IActionType {
  type: 'GET_USERS'
  payload: Array<typeof responseType>
}

interface IState {
  users: Array<typeof responseType>
  loading: boolean
}

const githubReducer = (state: IState, action: IActionType) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: [...action.payload],
        loading: false,
      }
    default:
      return state
  }
}

export default githubReducer
