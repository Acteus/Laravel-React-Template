import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
      setToken(null)
      localStorage.removeItem('token')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/login', loginData)
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setMessage('Login successful')
    } catch (error) {
      setMessage('Login failed')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/register', registerData)
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setMessage('Registration successful')
    } catch (error) {
      setMessage('Registration failed')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
      setMessage('Logged out')
    } catch (error) {
      setMessage('Logout failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Laravel + React App</h1>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        {user ? (
          <div>
            <h2 className="text-xl mb-4">Welcome, {user.name}</h2>
            <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded">Logout</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleLogin} className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Login</h3>
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
            </form>
            <form onSubmit={handleRegister}>
              <h3 className="text-lg font-semibold mb-4">Register</h3>
              <input
                type="text"
                placeholder="Name"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={registerData.password_confirmation}
                onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
