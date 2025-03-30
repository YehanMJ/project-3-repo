
import { useEffect, useState } from 'react'
import BG from '../Page/BG/BG'
import Login from '../Page/Login/Login'
import './App.css'
import Students from '../Page/StudentsMain/Students'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }
    , [])

  return (
    <>
      {
        login ? <Students />
          :
          <BG>
            <Routes>
              <Route path='*' element={<Navigate to={'/login'} />}></Route>
              <Route path='/login' element={<Login />}></Route>
            </Routes>
          </BG>
      }

    </>
  )
}

export default App
