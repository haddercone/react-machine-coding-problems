import './App.css'
import { useLogin } from './context/LoginContext'

function App() {
  const [isLoggedIn, handleLogin, user] = useLogin()
  return (
    <>
      <button onClick={() => handleLogin()}>{isLoggedIn ? "Log out" : "Log In"}</button>
      {isLoggedIn && user &&  <div>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>}
    </>
  )
}

export default App
