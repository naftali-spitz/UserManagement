import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/HomePage'
// import Login from './components/Login'
import UserManagementDashboard from './components/Dashboard'
import CustomSnackbar from './components/Snackbar'
import { hasToken } from './api'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(hasToken)

  return (
    <BrowserRouter>
    <CustomSnackbar />
      <Routes>
        <Route path='/' element={isLoggedIn ? (<Navigate to='/dashboard'/>) : <Home setIsLoggedIn={setIsLoggedIn} />} />
        {/* <Route path='/login' element={isLoggedIn ? (<Navigate to='/dashboard'/>) : <Login setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route path='/dashboard'
        element={isLoggedIn ? (<UserManagementDashboard setIsLoggedIn={setIsLoggedIn} />) : (<Navigate to='/'/>)} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
