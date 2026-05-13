import { useState } from 'react'
import HomePage from './pages/HomePage'
import CareerSearch from './pages/CareerSearch'
import CareerDetail from './pages/CareerDetail'
import UniversityFinder from './pages/UniversityFinder'
import NSFASPage from './pages/NSFASPage'
import Navbar from './components/Navbar'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [userAPS, setUserAPS] = useState(null)

  const navigate = (p, data = null) => {
    if (data?.career) setSelectedCareer(data.career)
    if (data?.aps !== undefined) setUserAPS(data.aps)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar page={page} navigate={navigate} />
      <main className="app-main">
        {page === 'home'    && <HomePage       navigate={navigate} />}
        {page === 'careers' && <CareerSearch   navigate={navigate} userAPS={userAPS} setUserAPS={setUserAPS} />}
        {page === 'career'  && <CareerDetail   navigate={navigate} career={selectedCareer} userAPS={userAPS} />}
        {page === 'unis'    && <UniversityFinder navigate={navigate} />}
        {page === 'nsfas'   && <NSFASPage      navigate={navigate} />}
      </main>
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">🎓</span>
            <strong>SA Career Guide</strong>
          </div>
          <p>Helping South African students find their path — from matric to career.</p>
          <p className="footer-disclaimer">Information sourced from official university and government publications. Always verify directly with your institution.</p>
        </div>
      </footer>
    </div>
  )
}
