import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import '@reach/dialog/styles.css'
import {Dialog} from '@reach/dialog'

function App() {
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenModal('login')}>Login</button>
      <button onClick={() => setOpenModal('register')}>Register</button>
      <Dialog
        isOpen={openModal === 'login'}
        onDismiss={() => setOpenModal('none')}
      >
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h2>Login</h2>
      </Dialog>
      <Dialog
        isOpen={openModal === 'register'}
        onDismiss={() => setOpenModal('none')}
      >
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h2>Register</h2>
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
