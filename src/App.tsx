import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// page
import Home from './components/pages/Home'
import Notfound from './components/pages/Notfound'

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notfound" element={<Notfound />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
