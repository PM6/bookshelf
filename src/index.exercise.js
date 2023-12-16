import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import '@reach/dialog/styles.css'
import {Dialog} from '@reach/dialog'

function App() {
  const [openModal, setOpenModal] = React.useState('none')

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenModal('login')}>Login</button>
      <button onClick={() => setOpenModal('register')}>Register</button>
      <Dialog
        aria-label="Login form"
        isOpen={openModal === 'login'}
        onDismiss={() => setOpenModal('none')}
      >
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h2>Login</h2>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog
        aria-label="Register form"
        isOpen={openModal === 'register'}
        onDismiss={() => setOpenModal('none')}
      >
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h2>Register</h2>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  )
}

function LoginForm({onSubmit, buttonText}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
