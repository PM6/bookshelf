import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'

function App() {
  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <button onClick={() => alert('Login clicked')}>Login</button>
      <button onClick={() => alert('Register clicked')}>Register</button>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
