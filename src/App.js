import React from 'react'
import AppRoutes from './routes/appRoutes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <ToastContainer/>
      <AppRoutes/>
</div>
  )
}

export default App
