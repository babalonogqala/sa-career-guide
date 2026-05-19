import { useState, useMemo } from 'react'
import { Search, Filter, ArrowRight, X } from 'lucide-react'
import { CAREERS, CATEGORIES } from '../data/saData'

export default function CareerSearch({ navigate, userAPS, setUserAPS }) {
  const [aps, setAps] = useState(userAPS || '')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = useMemo(() => {
    return CAREERS.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All Categories' || c.category === category
      return matchSearch && matchCat
    })
  }, [search, category])

  const apsParsed = aps ? parseInt(aps) : null

  const getAPSStatus = (career) => {
    if (!apsParsed) return 'unknown'
    if (apsParsed >= career.minAPS) return 'qualify'
    if (apsParsed >= career.minAPS - 4) return 'close'
    return 'below'
  }

  const statusLabel = { qualify: '✅ You qualify', close: '⚠️ Close — improve', below: '❌ Need higher APS', unknown: '' }
  const statusClass = { qualify: 'status-qualify', close: 'status-close', below: 'status-below', unknown: '' }

  return (
    <div className="page-careers">
      <div className="container">
        <div className="page-header">
          <h1>Career Explorer</h1>
          <p>Find careers that match your APS score and interests</p>
        </div>

        {/* SEARCH + FILTER BAR */}
        <div className="search-bar-wrap">
          <div className="search-bar">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search careers e.g. engineer, doctor, teacher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button className="clear-btn" onClick={() => setSearch('')}><X size={14} /></button>}
            </div>
            <div className="aps-mini-input">
              <label>My APS:</label>
              <input
                type="number"
                min="0"
                max="42"
                placeholder="e.g. 28"
                value={aps}
                onChange={e => { setAps(e.target.value); setUserAPS(e.target.value ? parseInt(e.target.value) : null) }}
              />
            </div>
            <button className="btn-outline" onClick={() => setShowFilter(f => !f)}>
              <Filter size={15} /> Filters
            </button>
          </div>

          {showFilter && (
            <div className="filter-panel">
              <div className="filter-group">
                <label>Category</label>
                <div className="filter-pills">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={'filter-pill' + (category === cat ? ' active' : '')}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* APS GUIDE */}
        {!apsParsed && (
          <div className="aps-info-banner">
            <strong>💡 Tip:</strong> Enter your APS score above to see which careers you qualify for. APS = sum of your best 6 matric subjects (Life Orientation excluded). Max APS = 42.
          </div>
        )}

        {apsParsed && (
          <div className="aps-result-banner">
            <strong>Your APS: {apsParsed}</strong>
            <span className="aps-breakdown">
              {apsParsed >= 35 ? '🌟 Excellent — qualifies for most degrees' :
               apsParsed >= 28 ? '👍 Good — qualifies for many degree programmes' :
               apsParsed >= 22 ? '✅ Adequate — qualifies for diplomas and some degrees' :
               '📚 Below average — focus on TVET/diploma options and improving specific subjects'}
            </span>
          </div>
        )}

        {/* RESULTS COUNT */}
        <div className="results-count">
          <strong>{filtered.length}</strong> career{filtered.length !== 1 ? 's' : ''} found
          {category !== 'All Categories' && <span> in <strong>{category}</strong></span>}
        </div>

        {/* CAREERS GRID */}
        <div className="careers-grid">
          {filtered.map(career => {
            const status = getAPSStatus(career)
            return (
              <button
                key={career.id}
                className={'career-card' + (status === 'below' ? ' card-dimmed' : '')}
                onClick={() => navigate('career', { career })}
              >
                <div className="career-card-top">
                  <span className="career-card-emoji">{career.emoji}</span>
                  <div className="career-card-info">
                    <span className="career-card-cat">{career.category}</span>
                    <h3 className="career-card-title">{career.title}</h3>
                  </div>
                </div>
                <p className="career-card-desc">{career.description}</p>
                <div className="career-card-meta">
                  <span className="meta-item">📊 APS {career.minAPS}+</span>
                  <span className="meta-item">💰 {career.avgSalary.split('–')[0].trim()}+</span>
                  <span className={'meta-item outlook-' + career.jobOutlook.toLowerCase().replace(' ','-')}>
                    {career.jobOutlook === 'Excellent' ? '🔥' : career.jobOutlook === 'Very Good' ? '⭐' : '📈'} {career.jobOutlook}
                  </span>
                </div>
                {status !== 'unknown' && (
                  <div className={'aps-status-bar ' + statusClass[status]}>
                    {statusLabel[status]}
                  </div>
                )}
                <div className="career-card-cta">
                  View courses & roadmap <ArrowRight size={14} />
                </div>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <span>🔍</span>
            <h3>No careers found</h3>
            <p>Try a different search term or category</p>
            <button className="btn-primary" onClick={() => { setSearch(''); setCategory('All Categories') }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
