import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
// page
import Home from './components/pages/Home'
import About from './components/pages/About'
import Notfound from './components/pages/Notfound'

// context
import { GithubProvider } from './context/github/GithubContext'

function App() {
  return (
    <GithubProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<Notfound />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubProvider>
  )
}

export default App
