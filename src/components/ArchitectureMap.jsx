import { useState } from 'react'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

const categories = {
  frontend: { title: 'Frontend Layer', color: '#0d9488', bg: 'rgba(13, 148, 136, 0.1)' },
  backend: { title: 'Backend / Compute', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.1)' },
  database: { title: 'Databases & Auth', color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
  ai: { title: 'Artificial Intelligence', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.1)' },
  tools: { title: 'Platform & Tools', color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' }
}

const nodes = [
  // Frontend
  { id: 'nextjs', label: 'Next.js', category: 'frontend', x: 60, y: 60, desc: 'React framework for production-ready frontend architectures and server-side rendering.' },
  { id: 'react', label: 'React.js', category: 'frontend', x: 60, y: 130, desc: 'Core frontend library for modular components and interactive user experiences.' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', x: 60, y: 200, desc: 'Utility-first CSS framework for clean, responsive, and modern styling systems.' },
  { id: 'typescript', label: 'TypeScript', category: 'frontend', x: 60, y: 270, desc: 'Typed superset of JavaScript ensuring robust codebases and compile-time validation.' },
  
  // Backend
  { id: 'nodejs', label: 'Node/Express', category: 'backend', x: 210, y: 95, desc: 'JavaScript runtime and framework orchestration for building REST APIs.' },
  { id: 'java', label: 'Java', category: 'backend', x: 210, y: 165, desc: 'Core programming language used for structured software design and algorithmic optimization.' },
  { id: 'docker', label: 'Docker', category: 'backend', x: 210, y: 235, desc: 'Containerization platform to build, package, and deploy software services reliably.' },

  // Database
  { id: 'postgresql', label: 'PostgreSQL', category: 'database', x: 360, y: 60, desc: 'Advanced open-source relational database for schema-driven records.' },
  { id: 'mongodb', label: 'MongoDB', category: 'database', x: 360, y: 130, desc: 'Document-based NoSQL database utilized for storing dynamic application collections.' },
  { id: 'supabase', label: 'Supabase Auth', category: 'database', x: 360, y: 200, desc: 'Open-source Firebase alternative providing database collections, auth, and RBAC.' },
  { id: 'firebase', label: 'Firebase Auth', category: 'database', x: 360, y: 270, desc: 'Platform hosting authentications, database collections, and real-time events.' },

  // Tools & APIs
  { id: 'openai', label: 'OpenAI API', category: 'ai', x: 510, y: 60, desc: 'LLM inference endpoint powering CareerCraft AI ATS feedback.' },
  { id: 'gemini', label: 'Gemini API', category: 'ai', x: 510, y: 130, desc: 'Generative AI API driving intelligent conversational agents and repair chat systems.' },
  { id: 'stripe', label: 'Stripe API', category: 'tools', x: 510, y: 200, desc: 'Stripe payment gateway API integrated in GreenCart checkout.' },
  { id: 'git', label: 'Git / GitHub', category: 'tools', x: 510, y: 270, desc: 'Distributed version control system managing repository state and team merges.' }
]

const edges = [
  // CareerCraft AI
  { from: 'typescript', to: 'nextjs', project: 'CareerCraft AI', desc: 'Codebase written in TypeScript' },
  { from: 'nextjs', to: 'supabase', project: 'CareerCraft AI', desc: 'Next.js queries Supabase DB for user details' },
  { from: 'nextjs', to: 'openai', project: 'CareerCraft AI', desc: 'Next.js routes request ATS analysis from OpenAI' },
  { from: 'nextjs', to: 'tailwind', project: 'CareerCraft AI', desc: 'Sleek UI layout styles defined via Tailwind CSS' },

  // ReGadget
  { from: 'react', to: 'nodejs', project: 'ReGadget', desc: 'React single page app queries Express endpoints' },
  { from: 'nodejs', to: 'mongodb', project: 'ReGadget', desc: 'Node.js server saves repair tickets in MongoDB' },
  { from: 'nodejs', to: 'firebase', project: 'ReGadget', desc: 'Node.js verifies active user auth in Firebase' },
  { from: 'nodejs', to: 'gemini', project: 'ReGadget', desc: 'Node.js pipes prompt queries to Gemini' },

  // GreenCart
  { from: 'react', to: 'nodejs', project: 'GreenCart', desc: 'React shopping cart client queries Node.js API' },
  { from: 'nodejs', to: 'mongodb', project: 'GreenCart', desc: 'Node.js saves e-commerce products in MongoDB' },
  { from: 'nodejs', to: 'stripe', project: 'GreenCart', desc: 'Node.js captures credit card sessions using Stripe' },
  { from: 'react', to: 'tailwind', project: 'GreenCart', desc: 'Tailwind styling applied to catalog filters' },

  // Freelance
  { from: 'nextjs', to: 'postgresql', project: 'First Bridge', desc: 'Next.js backend saves schemas to PostgreSQL' },
  { from: 'nextjs', to: 'supabase', project: 'First Bridge', desc: 'Next.js validates RBAC tokens via Supabase' },
  { from: 'react', to: 'git', project: 'Cosmoversity', desc: 'Client components merged and versions tracked on GitHub' }
]

export function ArchitectureMap() {
  const [selectedNode, setSelectedNode] = useState(null)

  const handleNodeClick = (nodeId) => {
    if (selectedNode === nodeId) {
      setSelectedNode(null)
    } else {
      setSelectedNode(nodeId)
    }
  }

  // Determine active elements based on selection
  const isNodeActive = (id) => {
    if (!selectedNode) return true
    if (selectedNode === id) return true
    
    // Check if there is an edge connecting selectedNode and id
    return edges.some(
      (edge) => 
        (edge.from === selectedNode && edge.to === id) || 
        (edge.to === selectedNode && edge.from === id)
    )
  }

  const isEdgeActive = (edge) => {
    if (!selectedNode) return false
    return edge.from === selectedNode || edge.to === selectedNode
  }

  const getConnectedProjects = () => {
    if (!selectedNode) return []
    const projects = new Set()
    edges.forEach((edge) => {
      if (edge.from === selectedNode || edge.to === selectedNode) {
        projects.add(edge.project)
      }
    })
    return Array.from(projects)
  }

  const nodeInfo = selectedNode ? nodes.find((n) => n.id === selectedNode) : null

  return (
    <section id="stack" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          category="Engineering Design"
          title="How I Build"
          subtitle="An interactive map of my tech stack. Click a node to filter and highlight its integration paths across projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive SVG Map */}
          <div className="lg:col-span-8 bg-surface border border-border-muted rounded-xl p-4 md:p-6 overflow-x-auto no-scrollbar scroll-smooth">
            <svg 
              className="w-full min-w-[580px] h-[340px] select-none" 
              viewBox="0 0 580 340"
              fill="none"
              stroke="currentColor"
            >
              {/* Category Column Labels */}
              <text x="60" y="25" fill="#6c7175" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">FRONTEND</text>
              <text x="210" y="25" fill="#6c7175" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">BACKEND</text>
              <text x="360" y="25" fill="#6c7175" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">DATA / AI</text>
              <text x="510" y="25" fill="#6c7175" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">TOOLS</text>

              {/* Connections (Edges) */}
              {edges.map((edge, idx) => {
                const fromNode = nodes.find((n) => n.id === edge.from)
                const toNode = nodes.find((n) => n.id === edge.to)
                if (!fromNode || !toNode) return null

                const active = isEdgeActive(edge)
                const faded = selectedNode && !active

                return (
                  <path
                    key={idx}
                    d={`M ${fromNode.x} ${fromNode.y} C ${(fromNode.x + toNode.x) / 2} ${fromNode.y}, ${(fromNode.x + toNode.x) / 2} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                    stroke={active ? '#0d9488' : '#26292c'}
                    strokeWidth={active ? 2 : 1}
                    strokeDasharray={active ? '5,5' : 'none'}
                    className={active ? 'pulse-subtle' : ''}
                    style={{ 
                      opacity: faded ? 0.15 : 1,
                      transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s'
                    }}
                  />
                )
              })}

              {/* Technology Nodes */}
              {nodes.map((node) => {
                const active = isNodeActive(node.id)
                const selected = selectedNode === node.id
                const faded = selectedNode && !active && !selected
                const catInfo = categories[node.category]

                return (
                  <g 
                    key={node.id} 
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node.id)}
                    style={{ 
                      opacity: faded ? 0.25 : 1,
                      transition: 'opacity 0.3s'
                    }}
                  >
                    {/* Node base outline */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill="#161719"
                      stroke={selected ? '#0d9488' : '#26292c'}
                      strokeWidth={selected ? 2.5 : 1.5}
                      style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                    />
                    
                    {/* Inner styling ring representing layer category */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="6"
                      fill={catInfo.color}
                    />

                    {/* Text Label */}
                    <text
                      x={node.x}
                      y={node.y + 32}
                      fill={selected ? '#0d9488' : '#f6f6f7'}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight={selected ? 'bold' : 'normal'}
                      textAnchor="middle"
                      style={{ transition: 'fill 0.3s' }}
                    >
                      {node.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Right: Explanatory Context Card */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <Card className="text-left h-full flex flex-col justify-between min-h-[300px]">
              <div>
                {!selectedNode ? (
                  <>
                    <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-2">
                      // Status Panel
                    </span>
                    <h4 className="text-lg font-bold text-primary mb-4">
                      Systems Explorer
                    </h4>
                    <p className="text-sm text-secondary leading-relaxed">
                      Select any node on the technology map. You will see its role, related category properties, and its specific interactions with databases, tools, or other APIs in Ayush's project builds.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <span 
                        className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                        style={{ color: categories[nodeInfo.category].color, backgroundColor: categories[nodeInfo.category].bg }}
                      >
                        {categories[nodeInfo.category].title}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-primary mb-2 font-mono">
                      {nodeInfo.label}
                    </h4>
                    
                    <p className="text-sm text-secondary leading-relaxed mb-6">
                      {nodeInfo.desc}
                    </p>

                    {getConnectedProjects().length > 0 && (
                      <div className="border-t border-border-muted/50 pt-4">
                        <span className="font-mono text-[10px] text-muted block mb-2 uppercase">// Connected In</span>
                        <div className="flex flex-wrap gap-2">
                          {getConnectedProjects().map((proj, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs font-mono font-medium text-teal-accent bg-teal-accent/5 border border-teal-accent/20 px-2 py-0.5 rounded"
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {selectedNode && (
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="mt-6 text-xs font-mono text-muted hover:text-primary transition-colors cursor-pointer text-left focus:outline-none"
                >
                  [ Clear Highlighted Selection ]
                </button>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
