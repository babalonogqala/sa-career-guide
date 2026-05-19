import { useState } from 'react'
import { ArrowLeft, ExternalLink, CheckCircle, Clock, TrendingUp, DollarSign, BookOpen, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { UNIVERSITIES } from '../data/saData'

export default function CareerDetail({ navigate, career, userAPS }) {
  const [activeTab, setActiveTab] = useState('courses')
  const [expandedStep, setExpandedStep] = useState(null)
  const [expandedCourse, setExpandedCourse] = useState(null)

  if (!career) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p>No career selected.</p>
        <button className="btn-primary" onClick={() => navigate('careers')}>Browse Careers</button>
      </div>
    )
  }

  const apsParsed = userAPS || null

  const getUniDetails = (uniIds) => {
    return uniIds.map(id => UNIVERSITIES.find(u => u.id === id)).filter(Boolean)
  }

  const qualifiesForCourse = (course) => {
    if (!apsParsed) return null
    return apsParsed >= course.aps
  }

  return (
    <div className="page-career-detail">
      {/* BACK */}
      <div className="container">
        <button className="back-btn" onClick={() => navigate('careers')}>
          <ArrowLeft size={16} /> Back to careers
        </button>
      </div>

      {/* HERO */}
      <div className="career-detail-hero">
        <div className="container">
          <div className="career-detail-hero-inner">
            <span className="career-detail-emoji">{career.emoji}</span>
            <div>
              <span className="career-detail-cat">{career.category}</span>
              <h1>{career.title}</h1>
              <p className="career-detail-desc">{career.description}</p>
              <div className="career-detail-badges">
                <span className="detail-badge"><BookOpen size={14} /> Min APS: {career.minAPS}</span>
                <span className="detail-badge"><DollarSign size={14} /> {career.avgSalary}</span>
                <span className={'detail-badge outlook-badge-' + career.jobOutlook.toLowerCase().replace(' ','-')}>
                  <TrendingUp size={14} /> {career.jobOutlook} outlook
                </span>
              </div>
              {career.subjects?.length > 0 && (
                <div className="subjects-required">
                  <strong>Recommended subjects:</strong>
                  {career.subjects.map((s, i) => <span key={i} className="subject-tag">{s}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* APS STATUS */}
      {apsParsed && (
        <div className="container">
          <div className={'aps-detail-banner ' + (apsParsed >= career.minAPS ? 'aps-ok' : 'aps-low')}>
            {apsParsed >= career.minAPS
              ? `✅ Your APS of ${apsParsed} meets the minimum requirement of ${career.minAPS} for this career.`
              : `⚠️ Your APS of ${apsParsed} is ${career.minAPS - apsParsed} points below the typical minimum of ${career.minAPS}. Some institutions may still admit you — check directly.`}
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="container">
        <div className="detail-tabs">
          {[
            { id: 'courses', label: '📚 Courses & Universities' },
            { id: 'roadmap', label: '🗺️ Career Roadmap' },
            { id: 'funding', label: '💰 Funding Options' },
          ].map(tab => (
            <button
              key={tab.id}
              className={'detail-tab' + (activeTab === tab.id ? ' active' : '')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: COURSES */}
        {activeTab === 'courses' && (
          <div className="tab-content">
            <div className="tab-intro">
              <h2>Courses to Study for {career.title}</h2>
              <p>These are the qualifications offered at South African institutions that lead to this career.</p>
            </div>
            <div className="courses-list">
              {career.courses.map((course, i) => {
                const unis = getUniDetails(course.universities || [])
                const qualifies = qualifiesForCourse(course)
                const isOpen = expandedCourse === i
                return (
                  <div key={i} className={'course-card' + (qualifies === false ? ' course-dim' : '')}>
                    <button className="course-card-header" onClick={() => setExpandedCourse(isOpen ? null : i)}>
                      <div className="course-header-left">
                        <h3 className="course-name">{course.name}</h3>
                        <div className="course-meta">
                          <span><Clock size={13} /> {course.duration}</span>
                          <span>📊 APS {course.aps}+</span>
                          {qualifies === true && <span className="course-qualify">✅ You qualify</span>}
                          {qualifies === false && <span className="course-no-qualify">❌ Need {course.aps - apsParsed} more points</span>}
                        </div>
                        {course.note && <p className="course-note">ℹ️ {course.note}</p>}
                      </div>
                      <div className="course-header-right">
                        <span className="uni-count">{unis.length > 0 ? `${unis.length} institution${unis.length !== 1 ? 's' : ''}` : 'See note'}</span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {isOpen && unis.length > 0 && (
                      <div className="course-unis">
                        <h4>Offered at:</h4>
                        <div className="unis-grid">
                          {unis.map(uni => (
                            <div key={uni.id} className="uni-item">
                              <div className="uni-item-header">
                                <span className="uni-logo">{uni.logo}</span>
                                <div>
                                  <strong>{uni.shortName}</strong>
                                  <span className="uni-type-badge">{uni.type}</span>
                                </div>
                              </div>
                              <p className="uni-full-name">{uni.name}</p>
                              <div className="uni-item-meta">
                                <span><MapPin size={11} /> {uni.city}, {uni.province}</span>
                                {uni.nsfas && <span className="nsfas-badge">NSFAS ✓</span>}
                              </div>
                              <a
                                href={uni.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="uni-link"
                                onClick={e => e.stopPropagation()}
                              >
                                Visit website <ExternalLink size={12} />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="tab-content">
            <div className="tab-intro">
              <h2>Your Roadmap: Study to Career</h2>
              <p>Follow these steps from your first year at university to landing your first job or professional registration in <strong>{career.title}</strong>.</p>
            </div>
            <div className="roadmap-timeline">
              {career.steps.map((step, i) => (
                <div key={i} className={'roadmap-step' + (expandedStep === i ? ' expanded' : '')}>
                  <div className="roadmap-step-left">
                    <div className="step-number">{i + 1}</div>
                    <div className="step-line" />
                  </div>
                  <div className="roadmap-step-right">
                    <button
                      className="roadmap-step-header"
                      onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                    >
                      <div>
                        <span className="step-phase">{step.phase}</span>
                        <h3 className="step-title">{step.title}</h3>
                      </div>
                      {expandedStep === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {expandedStep === i && (
                      <p className="step-detail">{step.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="roadmap-tip">
              <strong>💡 Pro tip:</strong> The roadmap is a guide — not a rigid timeline. Everyone's journey is different. Focus on building skills and relationships, not just ticking boxes.
            </div>
          </div>
        )}

        {/* TAB: FUNDING */}
        {activeTab === 'funding' && (
          <div className="tab-content">
            <div className="tab-intro">
              <h2>Funding Options for {career.title}</h2>
              <p>You don't have to pay for university out of your own pocket. Here are the main options.</p>
            </div>
            <div className="funding-cards">
              <div className="funding-card funding-nsfas">
                <div className="funding-card-header">
                  <span className="funding-icon">🏦</span>
                  <div>
                    <h3>NSFAS</h3>
                    <span>National Student Financial Aid Scheme</span>
                  </div>
                </div>
                <p>Covers tuition, accommodation, meals, books and transport for students with household income below <strong>R 350,000/year</strong>.</p>
                <ul className="funding-list">
                  <li>✅ Available at all public universities</li>
                  <li>✅ Covers living expenses — not just tuition</li>
                  <li>✅ Applications open in September each year</li>
                </ul>
                <button className="btn-primary" onClick={() => navigate('nsfas')}>
                  Full NSFAS Guide →
                </button>
              </div>

              <div className="funding-card">
                <div className="funding-card-header">
                  <span className="funding-icon">🎓</span>
                  <div>
                    <h3>Bursaries</h3>
                    <span>Government & corporate bursaries</span>
                  </div>
                </div>
                <p>Many government departments and large companies offer bursaries in scarce skills fields like engineering, medicine, and teaching.</p>
                <ul className="funding-list">
                  <li>🔍 Search: <strong>[your career] + bursary South Africa</strong></li>
                  <li>📋 Apply early — most close by October</li>
                  <li>💼 Many include vacation work or employment contracts</li>
                </ul>
              </div>

              <div className="funding-card">
                <div className="funding-card-header">
                  <span className="funding-icon">🏛️</span>
                  <div>
                    <h3>ISFAP</h3>
                    <span>Ikusasa Student Financial Aid Programme</span>
                  </div>
                </div>
                <p>For students whose household income is between <strong>R 350,000 – R 600,000/year</strong> (the "missing middle" who don't qualify for NSFAS).</p>
                <ul className="funding-list">
                  <li>✅ Covers tuition fees</li>
                  <li>📍 Available at selected institutions</li>
                </ul>
                <a href="https://www.ikusasasfap.org.za" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Visit ISFAP website <ExternalLink size={13} />
                </a>
              </div>

              <div className="funding-card">
                <div className="funding-card-header">
                  <span className="funding-icon">📞</span>
                  <div>
                    <h3>Institution Financial Aid Office</h3>
                    <span>Your university's own support</span>
                  </div>
                </div>
                <p>Every public university has a Financial Aid Office. They can advise on emergency funds, fee deferrals, and additional bursary opportunities.</p>
                <ul className="funding-list">
                  <li>📍 Visit or call before your first registration</li>
                  <li>📄 Bring all your financial documents</li>
                  <li>🤝 They are there to help — don't be afraid to ask</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
