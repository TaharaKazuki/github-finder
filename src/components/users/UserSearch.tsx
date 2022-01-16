import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import GithubContext, {
  IGithubContext,
} from '../../context/github/GithubContext'
import AlertContext, { IAlertContext } from '../../context/alert/AlertContext'
import { searchUser } from '../../context/github/GithubActions'

const UserSearch = () => {
  const [text, setText] = useState<string>('')
  const { users, dispatch } = useContext(GithubContext) as IGithubContext
  const { setAlert } = useContext(AlertContext) as IAlertContext

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({ type: 'SET_LOADING' })
      const users = await searchUser(text)
      dispatch({ type: 'GET_USERS', payload: users })
      setText('')
    }
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
