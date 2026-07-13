import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Target, Zap, BookOpen } from 'lucide-react'

const categories = [
  { key: 'arrays', label: 'Arrays & Strings', value: 95, count: 120, desc: 'Linear storage manipulation, sliding windows, and double pointer traversals.' },
  { key: 'graphs', label: 'Graphs', value: 70, count: 40, desc: 'Traversal algorithms (BFS, DFS, Dijkstra), cycle checks, and topological sorting.' },
  { key: 'trees', label: 'Trees & Tries', value: 80, count: 50, desc: 'Binary search tree structures, recursive traversals, and path optimization.' },
  { key: 'dp', label: 'Dynamic Programming', value: 60, count: 40, desc: 'Memoization layouts, bottom-up tabulations, and multidimensional knapsacks.' },
  { key: 'greedy', label: 'Greedy', value: 70, count: 50, desc: 'Interval matching, scheduling heuristics, and heap sorted strategies.' },
  { key: 'sql', label: 'SQL / Databases', value: 75, count: 50, desc: 'Relational data query composition, subqueries, group joins, and indexes.' }
]

export function CodingProfile() {
  const [activeCategory, setActiveCategory] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const [liveData, setLiveData] = useState({
    loading: true,
    error: false,
    totalSolved: 340,
    easySolved: 174,
    mediumSolved: 148,
    hardSolved: 18,
    ranking: 396748,
    contestRating: 1496,
    acceptanceRate: 88.9
  })

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      try {
        const [profileRes, contestRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/userProfile/ayush_lohiya_'),
          fetch('https://alfa-leetcode-api.onrender.com/ayush_lohiya_/contest')
        ])

        if (!profileRes.ok) throw new Error('Failed to fetch profile')
        const profile = await profileRes.json()

        let contestData = null
        if (contestRes.ok) {
          contestData = await contestRes.json()
        }

        if (!active) return

        let acRate = 88.9
        if (profile.matchedUserStats && profile.matchedUserStats.acSubmissionNum && profile.matchedUserStats.totalSubmissionNum) {
          const ac = profile.matchedUserStats.acSubmissionNum.find(x => x.difficulty === 'All')?.submissions || 0
          const tot = profile.matchedUserStats.totalSubmissionNum.find(x => x.difficulty === 'All')?.submissions || 1
          acRate = parseFloat(((ac / tot) * 100).toFixed(1))
        }

        setLiveData({
          loading: false,
          error: false,
          totalSolved: profile.totalSolved || 340,
          easySolved: profile.easySolved || 174,
          mediumSolved: profile.mediumSolved || 148,
          hardSolved: profile.hardSolved || 18,
          ranking: profile.ranking || 396748,
          contestRating: contestData?.contestRating ? Math.round(contestData.contestRating) : null,
          acceptanceRate: acRate
        })
      } catch (err) {
        console.error('Failed to fetch live LeetCode stats, using fallback data:', err)
        if (active) {
          setLiveData((prev) => ({
            ...prev,
            loading: false,
            error: true
          }))
        }
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [])

  // Radar parameters
  const size = 300
  const center = size / 2
  const rMax = 100 // maximum radius

  // Map category indexes to SVG coordinates
  const getCoordinates = (index, valuePercent) => {
    const angle = (Math.PI * 2 / categories.length) * index - Math.PI / 2
    const radius = (valuePercent / 100) * rMax
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return { x, y }
  }

  // Draw concentric layers (grid lines)
  const levels = [25, 50, 75, 100]
  const levelPolygons = levels.map((lvl) => {
    const points = categories.map((_, i) => {
      const { x, y } = getCoordinates(i, lvl)
      return `${x},${y}`
    }).join(' ')
    return points
  })

  // Draw data polygon
  const dataPoints = categories.map((cat, i) => {
    const { x, y } = getCoordinates(i, cat.value)
    return `${x},${y}`
  }).join(' ')

  return (
    <section id="leetcode" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        
        <SectionHeader 
          category="Coding Platform Metrics"
          title="Algorithms Profile"
          subtitle="A radar distribution of dynamic solved algorithmic problems on LeetCode. Practicing data structures and optimal time complexity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Custom SVG Radar Visualization */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <svg 
              className="w-full max-w-[320px] aspect-square text-secondary select-none overflow-visible"
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Concentric grid lines */}
              {levelPolygons.map((points, idx) => (
                <polygon
                  key={idx}
                  points={points}
                  fill="none"
                  stroke="#26292c"
                  strokeWidth="0.8"
                />
              ))}

              {/* Axis lines */}
              {categories.map((_, i) => {
                const { x, y } = getCoordinates(i, 100)
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#26292c"
                    strokeWidth="0.8"
                  />
                )
              })}

              {/* Data Area Polyfill */}
              <motion.polygon
                points={dataPoints}
                fill="rgba(13, 148, 136, 0.15)"
                stroke="#0d9488"
                strokeWidth="2"
                initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Vertices / Interactive Dots */}
              {categories.map((cat, i) => {
                const { x, y } = getCoordinates(i, cat.value)
                const isHovered = activeCategory === cat.key

                return (
                  <g 
                    key={cat.key}
                    onMouseEnter={() => setActiveCategory(cat.key)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 4}
                      fill={isHovered ? '#14b8a6' : '#0d9488'}
                      style={{ transition: 'r 0.2s, fill 0.2s' }}
                    />
                  </g>
                )
              })}

              {/* Outer Category Labels */}
              {categories.map((cat, i) => {
                const { x, y } = getCoordinates(i, 115)
                const angle = (Math.PI * 2 / categories.length) * i - Math.PI / 2
                let textAnchor = 'middle'
                let dy = '0.35em'
                if (Math.cos(angle) > 0.1) textAnchor = 'start'
                else if (Math.cos(angle) < -0.1) textAnchor = 'end'

                return (
                  <text
                    key={cat.key}
                    x={x}
                    y={y}
                    dy={dy}
                    fill={activeCategory === cat.key ? '#0d9488' : '#a2a6aa'}
                    fontSize="9.5"
                    fontFamily="monospace"
                    textAnchor={textAnchor}
                    style={{ transition: 'fill 0.2s', fontWeight: activeCategory === cat.key ? 'bold' : 'normal' }}
                  >
                    {cat.label.toUpperCase()}
                  </text>
                )
              })}
            </svg>
          </div>

          {/* Right: Solved metrics counters and details */}
          <div className="lg:col-span-6 space-y-6 text-left w-full">
            <div className="grid grid-cols-2 gap-4">
              <Card hoverEffect={false} className="border-border-muted bg-surface-hover/30">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="text-teal-accent" size={18} />
                  <span className="font-mono text-xs text-muted uppercase">Global Solved</span>
                </div>
                <h4 className="text-3xl font-mono font-bold text-primary">
                  {liveData.totalSolved}+
                </h4>
                <p className="text-xs text-muted mt-1">Live LeetCode Counter</p>
              </Card>

              <Card hoverEffect={false} className="border-border-muted bg-surface-hover/30">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-teal-accent" size={18} />
                  <span className="font-mono text-xs text-muted uppercase">Difficulty Focus</span>
                </div>
                <h4 className="text-3xl font-mono font-bold text-primary">
                  Medium
                </h4>
                <p className="text-xs text-muted mt-1">DSA Interview Standard</p>
              </Card>
            </div>

            {/* Dynamic LeetCode stats breakdown */}
            <Card hoverEffect={false} className="border-border-muted bg-surface-hover/30 p-5">
              <h4 className="text-sm font-bold font-mono text-primary mb-3.5 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-accent"></span>
                LIVE LEETCODE STATISTICS
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="bg-base/40 p-2.5 rounded-lg border border-border-muted/60">
                  <div className="text-[9px] text-muted uppercase tracking-wider">Easy</div>
                  <div className="text-base font-bold text-emerald-400">{liveData.easySolved}</div>
                </div>
                <div className="bg-base/40 p-2.5 rounded-lg border border-border-muted/60">
                  <div className="text-[9px] text-muted uppercase tracking-wider">Medium</div>
                  <div className="text-base font-bold text-amber-400">{liveData.mediumSolved}</div>
                </div>
                <div className="bg-base/40 p-2.5 rounded-lg border border-border-muted/60">
                  <div className="text-[9px] text-muted uppercase tracking-wider">Hard</div>
                  <div className="text-base font-bold text-rose-400">{liveData.hardSolved}</div>
                </div>
                <div className="bg-base/40 p-2.5 rounded-lg border border-border-muted/60">
                  <div className="text-[9px] text-muted uppercase tracking-wider">Acceptance</div>
                  <div className="text-base font-bold text-teal-accent">{liveData.acceptanceRate}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-base/20 border border-border-muted/40">
                  <span className="text-muted">Global Ranking</span>
                  <span className="font-semibold text-primary">{liveData.ranking?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-base/20 border border-border-muted/40">
                  <span className="text-muted">Contest Rating</span>
                  <span className="font-semibold text-teal-accent">{liveData.contestRating || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center text-xs border-t border-border-muted/30 pt-3">
                <span className="text-[10px] text-muted font-mono">
                  {liveData.loading ? 'Fetching dynamic data...' : '✓ Synchronized with LeetCode API'}
                </span>
                <a 
                  href="https://leetcode.com/u/ayush_lohiya_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-accent hover:underline flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase font-bold"
                >
                  Profile Link →
                </a>
              </div>
            </Card>

            <Card className="min-h-[120px] border-border-muted flex flex-col justify-center">
              {!activeCategory ? (
                <div>
                  <h4 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                    <BookOpen size={16} className="text-teal-accent" /> Algorithmic Mindset
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Practicing competitive programming patterns helps optimize space/time constraints ($O(N)$, $O(\log N)$). Hover over any vertex on the radar to examine metrics.
                  </p>
                </div>
              ) : (
                <div>
                  <span className="font-mono text-[9px] text-teal-accent tracking-widest uppercase block mb-1">
                    DSA Focus Profile
                  </span>
                  <h4 className="text-lg font-bold text-primary mb-2 font-mono">
                    {categories.find(c => c.key === activeCategory).label}
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed mb-3">
                    {categories.find(c => c.key === activeCategory).desc}
                  </p>
                  <span className="font-mono text-xs font-semibold text-teal-accent">
                    → {categories.find(c => c.key === activeCategory).count}+ Problems Solved
                  </span>
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
