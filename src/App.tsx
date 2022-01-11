import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
        </div>
      </Router>
    </>
  )
}

export default App
