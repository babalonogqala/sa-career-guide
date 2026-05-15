import { useState } from 'react'
import { Search, BookOpen, Building2, DollarSign, ArrowRight, Star, TrendingUp, Users } from 'lucide-react'
import { CAREERS, CATEGORIES } from '../data/saData'

export default function HomePage({ navigate }) {
  const [aps, setAps] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => {
    navigate('careers', { aps: aps ? parseInt(aps) : null })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const featuredCareers = CAREERS.slice(0, 6)

  return (
    <div className="page-home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🇿🇦 Built for South African Students</div>
          <h1 className="hero-title">
            Find Your <span className="hero-accent">Career Path</span><br />
            After Matric
          </h1>
          <p className="hero-sub">
            Enter your APS score, explore careers, find the right university course, check NSFAS funding, and get a step-by-step roadmap from study to your first job.
          </p>

          {/* APS SEARCH */}
          <div className="hero-search-card">
            <div className="aps-input-group">
              <div className="aps-input-wrap">
                <label>Your APS Score</label>
                <input
                  type="number"
                  min="0"
                  max="42"
                  placeholder="e.g. 28"
                  value={aps}
                  onChange={e => setAps(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button className="btn-primary btn-lg" onClick={handleSearch}>
                <Search size={18} />
                Find My Options
              </button>
            </div>
            <p className="aps-hint">
              Don't know your APS? <button className="link-btn" onClick={() => navigate('careers')}>Browse all careers anyway →</button>
            </p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <span className="stat-num">26</span>
              <span className="stat-label">Public Universities</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-num">50+</span>
              <span className="stat-label">TVET Colleges</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-num">13</span>
              <span className="stat-label">Career Paths</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-num">Free</span>
              <span className="stat-label">Always Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What Do You Need?</h2>
            <p>Everything a South African matric student needs in one place</p>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action-card" onClick={() => navigate('careers')}>
              <div className="qa-icon" style={{ background: '#EEF2FF' }}>
                <Search size={28} color="#4F46E5" />
              </div>
              <h3>Explore Careers</h3>
              <p>Browse careers by category, APS score, or subject. See salary ranges and job outlook.</p>
              <span className="qa-link">Browse careers <ArrowRight size={14} /></span>
            </button>
            <button className="quick-action-card" onClick={() => navigate('unis')}>
              <div className="qa-icon" style={{ background: '#F0FDF4' }}>
                <Building2 size={28} color="#16A34A" />
              </div>
              <h3>Find Universities</h3>
              <p>Compare all 26 SA public universities and private colleges by province, type, and courses.</p>
              <span className="qa-link">Find universities <ArrowRight size={14} /></span>
            </button>
            <button className="quick-action-card" onClick={() => navigate('nsfas')}>
              <div className="qa-icon" style={{ background: '#FFF7ED' }}>
                <DollarSign size={28} color="#EA580C" />
              </div>
              <h3>NSFAS & Funding</h3>
              <p>Learn how to apply for NSFAS, what documents you need, and other funding options.</p>
              <span className="qa-link">Get funded <ArrowRight size={14} /></span>
            </button>
            <button className="quick-action-card" onClick={() => navigate('careers')}>
              <div className="qa-icon" style={{ background: '#FDF4FF' }}>
                <TrendingUp size={28} color="#9333EA" />
              </div>
              <h3>Career Roadmap</h3>
              <p>Step-by-step guide from first year at university to landing your first job or experience.</p>
              <span className="qa-link">See the path <ArrowRight size={14} /></span>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED CAREERS */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <h2>Popular Career Paths</h2>
            <p>Click any career to see courses, universities, and your roadmap</p>
          </div>
          <div className="careers-preview-grid">
            {featuredCareers.map(career => (
              <button
                key={career.id}
                className="career-preview-card"
                onClick={() => navigate('career', { career })}
              >
                <span className="career-emoji">{career.emoji}</span>
                <div className="career-preview-info">
                  <h3>{career.title}</h3>
                  <span className="career-category">{career.category}</span>
                  <div className="career-preview-meta">
                    <span className="aps-badge">APS {career.minAPS}+</span>
                    <span className={'outlook-badge outlook-' + career.jobOutlook.toLowerCase().replace(' ','-')}>{career.jobOutlook}</span>
                  </div>
                </div>
                <ArrowRight size={16} className="card-arrow" />
              </button>
            ))}
          </div>
          <div className="section-cta">
            <button className="btn-primary" onClick={() => navigate('careers')}>
              View All {CAREERS.length} Careers <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to find your path</p>
          </div>
          <div className="how-grid">
            {[
              { step: '1', icon: '📝', title: 'Enter Your APS Score', desc: 'Your APS is the sum of your best 6 matric subjects (excluding Life Orientation). We use it to filter courses you qualify for.' },
              { step: '2', icon: '🔍', title: 'Explore & Compare', desc: 'Browse careers that match your score. See which universities offer the courses, what they cost, and whether NSFAS applies.' },
              { step: '3', icon: '🚀', title: 'Follow Your Roadmap', desc: 'Every career includes a detailed step-by-step guide — from first year at university all the way to getting your first job.' },
            ].map(item => (
              <div key={item.step} className="how-card">
                <div className="how-step">{item.step}</div>
                <div className="how-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NSFAS CALLOUT */}
      <section className="nsfas-callout">
        <div className="container">
          <div className="nsfas-callout-inner">
            <div className="nsfas-callout-text">
              <h2>Need Funding for University?</h2>
              <p>NSFAS covers tuition, accommodation, meals, books, and transport for qualifying students. Combined household income must be below R 350,000/year.</p>
              <ul className="nsfas-quick-list">
                <li>✅ Covers all public universities and TVET colleges</li>
                <li>✅ Applications open September each year</li>
                <li>✅ Step-by-step application guide included</li>
                <li>✅ Full list of required documents</li>
              </ul>
            </div>
            <button className="btn-white btn-lg" onClick={() => navigate('nsfas')}>
              Learn About NSFAS <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
