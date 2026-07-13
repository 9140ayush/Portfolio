import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Play, RotateCcw, Shuffle, Send, Terminal, Grid, BarChart3, Radio } from 'lucide-react'

// ==========================================
// 1. PATHFINDING VISUALIZER DEFINITIONS
// ==========================================
const ROWS = 9
const COLS = 16
const START_CELL = { r: 1, c: 1 }
const END_CELL = { r: 7, c: 14 }

function getInitialGrid() {
  const grid = []
  for (let r = 0; r < ROWS; r++) {
    const row = []
    for (let c = 0; c < COLS; c++) {
      row.push({
        r,
        c,
        isStart: r === START_CELL.r && c === START_CELL.c,
        isEnd: r === END_CELL.r && c === END_CELL.c,
        isWall: false,
        isVisited: false,
        isPath: false
      })
    }
    grid.push(row)
  }
  return grid
}

// ==========================================
// PLAYGROUND MAIN COMPONENT
// ==========================================
export function Playground() {
  const [activeTab, setActiveTab] = useState('pathfinding')

  // --- Pathfinding State ---
  const [grid, setGrid] = useState(getInitialGrid())
  const [isPathfindingRunning, setIsPathfindingRunning] = useState(false)

  // --- Sorting State ---
  const [sortArray, setSortArray] = useState([])
  const [isSortingRunning, setIsSortingRunning] = useState(false)
  const [activeCompareIndices, setActiveCompareIndices] = useState([])
  const [activeSwapIndices, setActiveSwapIndices] = useState([])
  const [sortSpeed, setSortSpeed] = useState(50) // ms delay

  // --- API Simulation State ---
  const [apiLogs, setApiLogs] = useState([])
  const [apiStep, setApiStep] = useState(0) // 0: idle, 1: client->server, 2: server->db, 3: db->server, 4: server->client
  const [isApiSimulating, setIsApiSimulating] = useState(false)

  // ==========================================
  // 1. PATHFINDING LOGIC
  // ==========================================
  const handleCellClick = (r, c) => {
    if (isPathfindingRunning) return
    if ((r === START_CELL.r && c === START_CELL.c) || (r === END_CELL.r && c === END_CELL.c)) return
    const newGrid = [...grid]
    newGrid[r][c].isWall = !newGrid[r][c].isWall
    setGrid(newGrid)
  }

  const runBFS = async () => {
    if (isPathfindingRunning) return
    setIsPathfindingRunning(true)

    // Reset visited and path states
    const resetGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isVisited: false,
        isPath: false
      }))
    )
    setGrid(resetGrid)

    const queue = [START_CELL]
    const parentMap = {}
    const key = (r, c) => `${r},${c}`
    
    parentMap[key(START_CELL.r, START_CELL.c)] = null
    const visitedSet = new Set([key(START_CELL.r, START_CELL.c)])
    let found = false

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

    while (queue.length > 0) {
      const curr = queue.shift()
      
      if (curr.r === END_CELL.r && curr.c === END_CELL.c) {
        found = true
        break
      }

      // Mark visited in visual grid
      if (!(curr.r === START_CELL.r && curr.c === START_CELL.c)) {
        resetGrid[curr.r][curr.c].isVisited = true
        setGrid([...resetGrid])
        await sleep(15)
      }

      const neighbors = [
        { r: curr.r - 1, c: curr.c },
        { r: curr.r + 1, c: curr.c },
        { r: curr.r, c: curr.c - 1 },
        { r: curr.r, c: curr.c + 1 }
      ]

      for (const n of neighbors) {
        if (n.r >= 0 && n.r < ROWS && n.c >= 0 && n.c < COLS) {
          if (!resetGrid[n.r][n.c].isWall && !visitedSet.has(key(n.r, n.c))) {
            visitedSet.add(key(n.r, n.c))
            parentMap[key(n.r, n.c)] = curr
            queue.push(n)
          }
        }
      }
    }

    if (found) {
      // Reconstruct path
      let curr = parentMap[key(END_CELL.r, END_CELL.c)]
      while (curr && !(curr.r === START_CELL.r && curr.c === START_CELL.c)) {
        resetGrid[curr.r][curr.c].isPath = true
        setGrid([...resetGrid])
        await sleep(30)
        curr = parentMap[key(curr.r, curr.c)]
      }
    }

    setIsPathfindingRunning(false)
  }

  const clearPathfinding = () => {
    setGrid(getInitialGrid())
  }

  // ==========================================
  // 2. SORTING VISUALIZER LOGIC
  // ==========================================
  const generateSortArray = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      arr.push(Math.floor(Math.random() * 85) + 15)
    }
    setSortArray(arr)
    setActiveCompareIndices([])
    setActiveSwapIndices([])
  }

  useEffect(() => {
    generateSortArray()
  }, [])

  const sleepSort = (ms) => new Promise((res) => setTimeout(res, ms))

  const runBubbleSort = async () => {
    if (isSortingRunning) return
    setIsSortingRunning(true)
    const arr = [...sortArray]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveCompareIndices([j, j + 1])
        await sleepSort(sortSpeed)

        if (arr[j] > arr[j + 1]) {
          setActiveSwapIndices([j, j + 1])
          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setSortArray([...arr])
          await sleepSort(sortSpeed)
          setActiveSwapIndices([])
        }
      }
    }
    setActiveCompareIndices([])
    setIsSortingRunning(false)
  }

  // ==========================================
  // 3. API SIMULATION LOGIC
  // ==========================================
  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString()
    setApiLogs((prev) => [...prev, `[${timestamp}] ${msg}`])
  }

  const triggerApiRequest = async () => {
    if (isApiSimulating) return
    setIsApiSimulating(true)
    setApiLogs([])

    const sleepApi = (ms) => new Promise((res) => setTimeout(res, ms))

    addLog('Client: POST /api/v1/resume/analyze')
    setApiStep(1)
    await sleepApi(800)

    addLog('Server: Verifying session token via Clerk Authentication')
    setApiStep(2)
    await sleepApi(800)

    addLog('DB Node: Querying comparative resume templates from Supabase')
    setApiStep(3)
    await sleepApi(800)

    addLog('Server: Structuring AI context payload & requesting OpenAI GPT API')
    setApiStep(4)
    await sleepApi(800)

    addLog('Client: Received analysis and ATS score suggestions (200 OK)')
    setApiStep(0)
    setIsApiSimulating(false)
  }

  return (
    <section id="playground" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          category="Engineering Sandbox"
          title="Engineering Playground"
          subtitle="Explore live, interactive computer science simulations showcasing algorithms, data sorting, and request flows."
        />

        {/* Tab triggers */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('pathfinding')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-mono font-medium transition-all cursor-pointer ${activeTab === 'pathfinding' ? 'bg-teal-accent text-white border-teal-accent' : 'bg-surface border-border-muted text-secondary hover:text-primary'}`}
          >
            <Grid size={15} /> Pathfinding (BFS)
          </button>
          <button
            onClick={() => setActiveTab('sorting')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-mono font-medium transition-all cursor-pointer ${activeTab === 'sorting' ? 'bg-teal-accent text-white border-teal-accent' : 'bg-surface border-border-muted text-secondary hover:text-primary'}`}
          >
            <BarChart3 size={15} /> Sorting Visualizer
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-mono font-medium transition-all cursor-pointer ${activeTab === 'api' ? 'bg-teal-accent text-white border-teal-accent' : 'bg-surface border-border-muted text-secondary hover:text-primary'}`}
          >
            <Radio size={15} /> API Flow Simulation
          </button>
        </div>

        {/* Dynamic Sandbox Windows */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. PATHFINDING INTERACTIVE WINDOW */}
            {activeTab === 'pathfinding' && (
              <motion.div
                key="pathfinding"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-4 md:p-6 text-center border-border-muted bg-surface-hover/30">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-primary">Grid Pathfinding</h4>
                      <p className="text-xs text-muted">Click/tap grid blocks to draw walls and click Run.</p>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={runBFS} variant="primary" className="py-2 px-4 text-xs font-mono" disabled={isPathfindingRunning}>
                        <Play size={12} /> Run BFS
                      </Button>
                      <Button onClick={clearPathfinding} variant="secondary" className="py-2 px-4 text-xs font-mono" disabled={isPathfindingRunning}>
                        <RotateCcw size={12} /> Reset
                      </Button>
                    </div>
                  </div>

                  {/* Grid Renderer */}
                  <div className="flex justify-center overflow-x-auto py-2">
                    <div className="grid grid-cols-16 gap-1 bg-base p-3 rounded-lg border border-border-muted/50 w-fit">
                      {grid.map((row, rIdx) =>
                        row.map((cell, cIdx) => {
                          let cellClass = 'bg-surface border-border-muted/30'
                          if (cell.isStart) cellClass = 'bg-teal-accent border-teal-accent shadow-md shadow-teal-accent/20'
                          else if (cell.isEnd) cellClass = 'bg-rose-600 border-rose-600'
                          else if (cell.isWall) cellClass = 'bg-muted border-muted'
                          else if (cell.isPath) cellClass = 'bg-teal-accent/80 border-teal-accent shadow-sm'
                          else if (cell.isVisited) cellClass = 'bg-teal-accent/20 border-teal-accent/30'

                          return (
                            <div
                              key={`${rIdx}-${cIdx}`}
                              onClick={() => handleCellClick(rIdx, cIdx)}
                              className={`w-6 h-6 md:w-8 md:h-8 rounded-[4px] border cursor-pointer transition-colors duration-150 ${cellClass}`}
                            />
                          )
                        })
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* 2. SORTING VISUALIZER INTERACTIVE WINDOW */}
            {activeTab === 'sorting' && (
              <motion.div
                key="sorting"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-4 md:p-6 text-center border-border-muted bg-surface-hover/30">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-primary">Sorting Algorithm</h4>
                      <p className="text-xs text-muted">Simulate and visualize comparison indices dynamically.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      <Button onClick={runBubbleSort} variant="primary" className="py-2 px-4 text-xs font-mono" disabled={isSortingRunning}>
                        <Play size={12} /> Bubble Sort
                      </Button>
                      <Button onClick={generateSortArray} variant="secondary" className="py-2 px-4 text-xs font-mono" disabled={isSortingRunning}>
                        <Shuffle size={12} /> Shuffle
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted uppercase">Speed</span>
                        <input
                          type="range"
                          min="10"
                          max="150"
                          value={sortSpeed}
                          onChange={(e) => setSortSpeed(Number(e.target.value))}
                          className="w-20 accent-teal-accent bg-base border border-border-muted rounded-full"
                          disabled={isSortingRunning}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Array Bars Renderer */}
                  <div className="h-48 bg-base rounded-lg border border-border-muted/50 flex items-end justify-center gap-1.5 p-4">
                    {sortArray.map((val, idx) => {
                      const isComparing = activeCompareIndices.includes(idx)
                      const isSwapping = activeSwapIndices.includes(idx)
                      
                      let barColor = 'bg-secondary/40'
                      if (isSwapping) barColor = 'bg-rose-500'
                      else if (isComparing) barColor = 'bg-teal-accent'

                      return (
                        <div
                          key={idx}
                          className={`w-4 rounded-t transition-all ${barColor}`}
                          style={{ height: `${val}%` }}
                        />
                      )
                    })}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* 3. API SEQUENCE FLOW INTERACTIVE WINDOW */}
            {activeTab === 'api' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-4 md:p-6 text-center border-border-muted bg-surface-hover/30">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-primary">API Sequence Request</h4>
                      <p className="text-xs text-muted">Trace packets travelling across clients, backends, and databases.</p>
                    </div>
                    <div>
                      <Button onClick={triggerApiRequest} variant="primary" className="py-2 px-4 text-xs font-mono" disabled={isApiSimulating}>
                        <Send size={12} /> Send Request
                      </Button>
                    </div>
                  </div>

                  {/* Packet Path SVG */}
                  <div className="relative h-28 bg-base rounded-lg border border-border-muted/50 p-4 mb-6 flex justify-between items-center px-8">
                    
                    {/* Node 1: Client */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold ${apiStep === 1 || apiStep === 0 && isApiSimulating ? 'bg-teal-accent border-teal-accent text-white' : 'bg-surface border-border-muted text-secondary'}`}>
                        Client
                      </div>
                    </div>

                    {/* Path 1 -> 2 */}
                    <div className="flex-1 h-[2px] bg-border-muted relative mx-2">
                      {apiStep === 1 && (
                        <motion.div 
                          className="absolute w-3 h-3 bg-teal-accent rounded-full -top-[5px]"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
                        />
                      )}
                      {apiStep === 4 && (
                        <motion.div 
                          className="absolute w-3 h-3 bg-teal-accent rounded-full -top-[5px]"
                          animate={{ left: ['100%', '0%'] }}
                          transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Node 2: Gateway */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold ${apiStep === 2 || apiStep === 4 ? 'bg-teal-accent border-teal-accent text-white' : 'bg-surface border-border-muted text-secondary'}`}>
                        Server
                      </div>
                    </div>

                    {/* Path 2 -> 3 */}
                    <div className="flex-1 h-[2px] bg-border-muted relative mx-2">
                      {apiStep === 2 && (
                        <motion.div 
                          className="absolute w-3 h-3 bg-teal-accent rounded-full -top-[5px]"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
                        />
                      )}
                      {apiStep === 3 && (
                        <motion.div 
                          className="absolute w-3 h-3 bg-teal-accent rounded-full -top-[5px]"
                          animate={{ left: ['100%', '0%'] }}
                          transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Node 3: Database */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold ${apiStep === 3 ? 'bg-teal-accent border-teal-accent text-white' : 'bg-surface border-border-muted text-secondary'}`}>
                        DB
                      </div>
                    </div>
                  </div>

                  {/* Terminal Console Output */}
                  <div className="bg-[#08090a] rounded-lg border border-border-muted p-4 text-left font-mono text-xs text-emerald-500 overflow-y-auto h-32 flex flex-col gap-1.5 shadow-inner">
                    <div className="text-muted flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-border-muted/30">
                      <Terminal size={12} /> CONSOLE LOGGER OUTPUT
                    </div>
                    {apiLogs.length === 0 ? (
                      <span className="text-muted">Console idle. Click "Send Request" to trigger simulation logs.</span>
                    ) : (
                      apiLogs.map((log, idx) => <div key={idx}>{log}</div>)
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
