import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SginupPage from '../pages/sginupPage'
import Loginpage from '../pages/loginpage'
import ChatScreen from '../pages/chatScreen'

const AppRoutes = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Loginpage />}
        />

        <Route
          path="/signup"
          element={<SginupPage />}
        />

        <Route
          path="/chat"
          element={<ChatScreen />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
