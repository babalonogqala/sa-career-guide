import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'

const LINKS = [
  { id: 'home',    label: 'Home' },
  { id: 'careers', label: 'Career Explorer' },
  { id: 'unis',    label: 'Universities' },
  { id: 'nsfas',   label: 'NSFAS & Funding' },
]

export default function Navbar({ page, navigate }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => { navigate('home'); setOpen(false) }}>
          <GraduationCap size={24} />
          <span>SA Career Guide</span>
        </button>

        <div className={'nav-links' + (open ? ' open' : '')}>
          {LINKS.map(l => (
            <button
              key={l.id}
              className={'nav-link' + (page === l.id ? ' active' : '')}
              onClick={() => { navigate(l.id); setOpen(false) }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </nav>
  )
}
