import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  User, 
  Ticket, 
  MapPin, 
  Clock, 
  Compass, 
  Coffee, 
  Send, 
  Activity, 
  CloudRain, 
  TrendingUp, 
  Plus, 
  Check, 
  Zap, 
  Key,
  Flame,
  Utensils,
  Navigation,
  Eye,
  Play,
  Pause,
  Users,
  LogOut
} from 'lucide-react';
import { STADIUM_CONFIGS } from './data/stadiums';

// Dynamic Stadium Outline and Playing Field visual elements based on sport & venue
const renderStadiumMapElements = (stadiumId, isFanView = false) => {
  const pitchColor = isFanView ? "rgba(10, 61, 46, 0.85)" : "rgba(4, 120, 87, 0.85)";
  const strokeColor = isFanView ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)";
  const strokeWidth = isFanView ? 1.5 : 2;

  switch (stadiumId) {
    case 'narendra_modi':
      // Circular cricket stadium with custom boundaries & pitch strip
      return (
        <g id="modi-stadium-layout">
          {/* Outer Stadium Rim: Circular */}
          <circle cx="200" cy="150" r="135" 
            fill={isFanView ? "rgba(11, 15, 25, 0.75)" : "rgba(22, 29, 48, 0.55)"} 
            stroke={isFanView ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"} 
            strokeWidth="4" 
          />
          
          {/* Cricket Ground Circular Boundary */}
          <circle cx="200" cy="150" r="90" fill={pitchColor} stroke={strokeColor} strokeWidth={strokeWidth} />
          
          {/* Inner 30-Yard Circle (Dashed) */}
          <circle cx="200" cy="150" r="60" fill="none" stroke={strokeColor} strokeWidth={strokeWidth - 0.5} strokeDasharray="4 4" opacity="0.6" />
          
          {/* Central Pitch Strip */}
          <rect x="193" y="132" width="14" height="36" fill="#eab308" stroke="rgba(0,0,0,0.2)" strokeWidth="1" opacity="0.85" rx="1" />
          <line x1="193" y1="138" x2="207" y2="138" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <line x1="193" y1="162" x2="207" y2="162" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        </g>
      );
    case 'wembley':
      // Soccer field with the iconic sweeping Wembley Arch!
      return (
        <g id="wembley-stadium-layout">
          {/* Outer Stadium Rim: Oval */}
          <path d="M200 15 C320 15, 385 65, 385 150 C385 235, 320 285, 200 285 C80 285, 15 235, 15 150 C15 65, 80 15, 200 15 Z" 
            fill={isFanView ? "rgba(11, 15, 25, 0.75)" : "rgba(22, 29, 48, 0.55)"} 
            stroke={isFanView ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"} 
            strokeWidth="4" 
          />
          
          {/* Soccer Pitch */}
          <rect x="140" y="110" width="120" height="80" rx="4" fill={pitchColor} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1="200" y1="110" x2="200" y2="190" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="200" cy="150" r="20" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
          
          {/* Iconic Wembley Arch (Sweeping Neon blue-glow curve across the top) */}
          <path d="M40 150 A 175 140 0 0 1 360 150" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="6" strokeLinecap="round" />
          <path d="M40 150 A 175 140 0 0 1 360 150" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4">
            <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
      );
    case 'metlife':
    default:
      // Standard MetLife Oval Soccer Field
      return (
        <g id="metlife-stadium-layout">
          {/* Outer Stadium Rim */}
          <path d="M200 15 C320 15, 385 65, 385 150 C385 235, 320 285, 200 285 C80 285, 15 235, 15 150 C15 65, 80 15, 200 15 Z" 
            fill={isFanView ? "rgba(11, 15, 25, 0.75)" : "rgba(22, 29, 48, 0.55)"} 
            stroke={isFanView ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"} 
            strokeWidth="4" 
          />
          
          {/* Soccer Pitch */}
          <rect x="140" y="110" width="120" height="80" rx="4" fill={pitchColor} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1="200" y1="110" x2="200" y2="190" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="200" cy="150" r="20" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
        </g>
      );
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('operations');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  
  // Stadium Selection State
  const [currentStadiumId, setCurrentStadiumId] = useState('metlife');
  const activeStadium = STADIUM_CONFIGS[currentStadiumId];

  // Sector metadata computed dynamically from config
  const sectorData = {};
  activeStadium.sectors.forEach(s => {
    sectorData[s.name] = s;
  });

  // Header Dropdown Search/Filter State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Ticket Scanner State
  const [scannedTicketCode, setScannedTicketCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanFeedback, setScanFeedback] = useState(null);

  // Operations State
  const [selectedSector, setSelectedSector] = useState('East Stand');
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      location: 'East Turnstiles (Gate B)',
      category: 'Ticketing Access',
      priority: 'medium',
      description: 'Turnstile #4 barcode scanner fails to read digital wallets. 15+ fans waiting in queue.',
      status: 'Dispatched',
      timestamp: '18:34',
      dispatch: {
        staff: 'Marcus Vance (IT Support)',
        instruction: 'Deploy field scanner, verify turnstile network connectivity, and direct overflow to Gate B2.'
      }
    },
    {
      id: 2,
      location: 'Section 112 (South Stand)',
      category: 'Crowd Safety',
      priority: 'high',
      description: 'Minor crowd congestion near stairway exit due to misplaced advertising billboard blocking corridor.',
      status: 'In Progress',
      timestamp: '18:42',
      dispatch: {
        staff: 'Supervisor Sarah Chen',
        instruction: 'Immediately coordinate with stadium crew to relocate board. Clear egress route for fans.'
      }
    },
    {
      id: 3,
      location: 'Concession Stand #8',
      category: 'Facility Maintenance',
      priority: 'low',
      description: 'Soft drink fountain carbonation line leak. Fluid spill near ordering lane.',
      status: 'Completed',
      timestamp: '18:15',
      dispatch: {
        staff: 'Janitorial Crew Delta',
        instruction: 'Clean spill area and put up wet-floor signage. Notify concession vendor to shut valve.'
      }
    }
  ]);

  const [newLoc, setNewLoc] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);

  // Fan Portal State
  const [selectedGate, setSelectedGate] = useState('Gate B');
  const [currentRouteStep, setCurrentRouteStep] = useState(1);
  const [orders, setOrders] = useState([]);
  const [activeOrderMsg, setActiveOrderMsg] = useState('');

  const ticketInfo = activeStadium.ticket;
  const concessionsList = activeStadium.concessions;

  // ── Game Simulation Engine ──────────────────────────────────────────────────
  // Phase definitions: each maps 4 sector names → { density%, colorClass, status }
  const SIM_PHASES = {
    gates_open: {
      label: 'Gates Open',
      icon: '🚪',
      color: 'var(--color-success)',
      desc: 'Fans streaming in through entry gates. North & East filling up.',
      sectors: {
        'North Stand': { density: '42%', colorClass: 'sector-low', status: 'Filling Up' },
        'East Stand':  { density: '61%', colorClass: 'sector-medium', status: 'Moderate Flow' },
        'South Stand': { density: '28%', colorClass: 'sector-low', status: 'Early Arrivals' },
        'West Stand':  { density: '35%', colorClass: 'sector-low', status: 'Normal Flow' },
      }
    },
    match_starting: {
      label: 'Match Starting',
      icon: '⚡',
      color: 'var(--color-warning)',
      desc: 'All stands filling rapidly. Concessions at peak load.',
      sectors: {
        'North Stand': { density: '79%', colorClass: 'sector-medium', status: 'Heavy Flow' },
        'East Stand':  { density: '85%', colorClass: 'sector-high', status: 'Congested' },
        'South Stand': { density: '71%', colorClass: 'sector-medium', status: 'Filling Fast' },
        'West Stand':  { density: '88%', colorClass: 'sector-high', status: 'At Capacity' },
      }
    },
    match_live: {
      label: 'Match Live',
      icon: '🔴',
      color: 'var(--color-danger)',
      desc: 'All sectors at peak. Gates secured. Operations on alert.',
      sectors: {
        'North Stand': { density: '94%', colorClass: 'sector-high', status: 'Severe Congestion' },
        'East Stand':  { density: '91%', colorClass: 'sector-high', status: 'Severe Congestion' },
        'South Stand': { density: '96%', colorClass: 'sector-high', status: 'At Max Capacity' },
        'West Stand':  { density: '93%', colorClass: 'sector-high', status: 'Severe Congestion' },
      }
    },
    half_time: {
      label: 'Half Time',
      icon: '⏸',
      color: 'var(--color-purple)',
      desc: 'Mass movement to concession stands. Corridors at risk.',
      sectors: {
        'North Stand': { density: '55%', colorClass: 'sector-medium', status: 'Evacuating Seats' },
        'East Stand':  { density: '48%', colorClass: 'sector-low', status: 'Moving to Concessions' },
        'South Stand': { density: '67%', colorClass: 'sector-medium', status: 'Partial Evacuation' },
        'West Stand':  { density: '52%', colorClass: 'sector-medium', status: 'Moderate Movement' },
      }
    },
    crowd_exiting: {
      label: 'Crowd Exiting',
      icon: '🚶',
      color: '#94a3b8',
      desc: 'Final whistle blown. Coordinated wave exit underway.',
      sectors: {
        'North Stand': { density: '38%', colorClass: 'sector-low', status: 'Wave 1 Exiting' },
        'East Stand':  { density: '22%', colorClass: 'sector-low', status: 'Clearing' },
        'South Stand': { density: '44%', colorClass: 'sector-low', status: 'Wave 2 Exiting' },
        'West Stand':  { density: '17%', colorClass: 'sector-low', status: 'Almost Clear' },
      }
    }
  };

  const [simPhase, setSimPhase] = useState(null);       // active phase key or null
  const [simTick, setSimTick] = useState(0);            // drives micro-fluctuations
  const simIntervalRef = useRef(null);

  // Start / stop the tick timer whenever simPhase changes
  useEffect(() => {
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    if (simPhase) {
      simIntervalRef.current = setInterval(() => {
        setSimTick(t => t + 1);
      }, 1800);
    }
    return () => clearInterval(simIntervalRef.current);
  }, [simPhase]);

  // Build the active sector data: simulation overrides real config when a phase is active
  const sectorNames = ['North Stand', 'East Stand', 'South Stand', 'West Stand'];
  const simulatedSectorData = {};
  sectorNames.forEach(name => {
    const base = sectorData[name];
    if (simPhase && SIM_PHASES[simPhase]) {
      const override = SIM_PHASES[simPhase].sectors[name];
      // Add subtle ±2% tick fluctuation to density number for live feel
      const basePct = parseInt(override.density);
      const fluctuation = (simTick % 3 === 0) ? 1 : (simTick % 3 === 1) ? -1 : 0;
      const livePct = Math.min(99, Math.max(1, basePct + fluctuation));
      simulatedSectorData[name] = { ...base, ...override, density: `${livePct}%` };
    } else {
      simulatedSectorData[name] = base;
    }
  });
  // ────────────────────────────────────────────────────────────────────────────

  // AI Assistant State
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Synchronize AI greeting with selected stadium context
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: `🏟️ Welcome ${activeStadium.ticket.holder}! I am **ArenaFlow Assistant**, your AI coordinator for ${activeStadium.name}. \n\nI have retrieved your smart ticket for **${activeStadium.currentMatch}**. I can guide you to your seat at **${activeStadium.ticket.seat.split(',')[0]}**, recommend low-wait food concessions, or report any operational issues. What can I assist you with?`,
        reasoning: `System prompt injected fan context (${activeStadium.ticket.holder}, ${activeStadium.ticket.seat}, Gate: ${activeStadium.ticket.gate}, Match: ${activeStadium.currentMatch}).`
      }
    ]);
  }, [currentStadiumId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);



  // Preset Prompts for Fan
  const presetPrompts = [
    `How do I navigate to ${activeStadium.ticket.seat.split(',')[0]} from entry gate?`,
    "Where is the nearest food stall with wait times under 5 mins?",
    "Report a medical hazard: broken glass at South Entrance.",
    "What stadium rules apply to banners and bags?"
  ];

  // AI Dispatch Logic
  const handleAddIncident = (e) => {
    e.preventDefault();
    if (!newLoc || !newDesc) return;

    setIsDispatching(true);

    // Simulate AI Dispatch reasoning
    setTimeout(async () => {
      let category = 'Operations Management';
      let priority = 'medium';
      let staff = 'General Response Team';
      let instruction = 'Inspect area and resolve details.';

      // Smart Regex logic mimicking model classification
      const text = newDesc.toLowerCase() + ' ' + newLoc.toLowerCase();
      if (text.includes('medical') || text.includes('hurt') || text.includes('passed out') || text.includes('breathing') || text.includes('heart')) {
        category = 'Medical Emergency';
        priority = 'high';
        staff = 'Medical Crew Team Alpha (Nearest)';
        instruction = 'Take emergency kit, proceed immediately, stabilize occupant, and request stretcher if needed.';
      } else if (text.includes('fight') || text.includes('security') || text.includes('altercation') || text.includes('protest') || text.includes('gate crash')) {
        category = 'Security & Safety';
        priority = 'high';
        staff = 'Response Squad Beta (Officers 14 & 15)';
        instruction = 'Report to location, de-escalate situation, separate involved parties, and log incident details.';
      } else if (text.includes('spill') || text.includes('leak') || text.includes('slip') || text.includes('water') || text.includes('dirty')) {
        category = 'Sanitation & Safety';
        priority = 'low';
        staff = 'Sanitation Worker Davis';
        instruction = 'Bring wet mop, cleanup materials, and place caution warning signs around the perimeter.';
      } else if (text.includes('ticket') || text.includes('scanner') || text.includes('barcode') || text.includes('gate') || text.includes('entry')) {
        category = 'Access Systems';
        priority = 'medium';
        staff = 'Access Specialist Kevin';
        instruction = 'Check turnstile reader power supply, reboot local gateway, and guide visitors to alternate gate if reboot fails.';
      }

      // If user provided Gemini Key, try to call actual Gemini API!
      if (geminiApiKey) {
        try {
          const apiResponse = await callGeminiAPI(
            `Analyze this stadium incident report:
            Location: ${newLoc}
            Description: ${newDesc}
            
            Return a JSON object exactly with these keys:
            - category (e.g., Medical, Security, Facilities, Ticketing)
            - priority (high, medium, low)
            - staff (suggest a realistic role or team)
            - instruction (a concise task instruction for this crew)
            
            Respond with ONLY the JSON object. No Markdown formatting, no codeblocks.`
          );
          if (apiResponse) {
            const parsed = JSON.parse(apiResponse.replace(/```json/g, '').replace(/```/g, '').trim());
            category = parsed.category || category;
            priority = parsed.priority || priority;
            staff = parsed.staff || staff;
            instruction = parsed.instruction || instruction;
          }
        } catch (err) {
          console.error("Gemini live call error, using local classification:", err);
        }
      }

      const freshIncident = {
        id: incidents.length + 1,
        location: newLoc,
        category: category,
        priority: priority,
        description: newDesc,
        status: 'Dispatched',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dispatch: { staff, instruction }
      };

      setIncidents([freshIncident, ...incidents]);
      setNewLoc('');
      setNewDesc('');
      setIsDispatching(false);
    }, 1500);
  };

  // API Call to Gemini
  const callGeminiAPI = async (promptText) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      throw e;
    }
  };

  // AI Assistant Query handling
  const handleSendChat = async (presetText = null) => {
    const query = presetText || userInput;
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // AI Response generation
    setTimeout(async () => {
      let aiText = '';
      let reasoningText = 'Simulated logic based on stadium context variables.';

      const lowercaseQuery = query.toLowerCase();

      if (lowercaseQuery.includes('section 124') || lowercaseQuery.includes('navigate') || lowercaseQuery.includes('how to get to')) {
        aiText = `📍 **Direct Route to Section 124 (East Stand):**\n\n1. From your entrance at **Gate B**, move past the security screening checkpoint.\n2. Take the **East Escalator Escalade** up to Level 1 Concourse.\n3. Turn right and walk past the concessions area (near Concession Stand 8).\n4. Section 124 entrance will be on your left. Seek usher **Marcus** if you need wheelchair assistance.\n\n*Live Traffic Status: Security lines at Gate B are running efficiently (under 4 minutes wait time).*`;
        reasoningText = "Analyzed location context for Gate B and Section 124 route mapping.";
      } else if (lowercaseQuery.includes('food') || lowercaseQuery.includes('concession') || lowercaseQuery.includes('eat') || lowercaseQuery.includes('drink')) {
        aiText = `🍔 **Concession Stand Real-time Wait Guide:**\n\n*   **Giant Bavarian Pretzel** (Stall #2): Wait time **4 mins** (Nearest to Section 124, 50m north).\n*   **Neon FIFA Soda** (Stall #3): Wait time **2 mins** (Next to Section 124 entrance).\n*   **Stadium Angus Burger** (Stall #1): Wait time **15 mins** (High congestion due to halftime rush).\n\n💡 *Tip: Order right now to collect your Giant Bavarian Pretzel with minimal wait!*`;
        reasoningText = "Scanned current queue times across nearby active concessions.";
      } else if (lowercaseQuery.includes('medical') || lowercaseQuery.includes('report') || lowercaseQuery.includes('hazard') || lowercaseQuery.includes('glass') || lowercaseQuery.includes('spill')) {
        aiText = `⚠️ **Emergency Dispatch Logged:**\n\nI have successfully initiated an operational dispatch alert for the reported hazard: *"${query}"*.\n\n**Operations Room Dispatch Action:**\n- **Target Location:** South Stand Area / South Gate C\n- **Crew Dispatched:** Immediate Safety Response Squad\n- **Action:** Hazard containment and debris clearing.\n\nThank you for keeping MetLife Stadium safe!`;
        reasoningText = "Detected hazard keyword. Auto-registered dispatch incident log.";
      } else {
        aiText = `📋 **Arena Info Desk:**\n\nI can help you with stadium operations for **Argentina vs France** at MetLife Stadium:\n- **Ticket & Seating:** Your seat is at **Section 124, Row 12, Seat 4**.\n- **Baggage Policy:** Bags larger than 12x6x12 inches are not permitted. A bag deposit terminal is available outside Gate A.\n- **Operations Status:** Stadium is at **67% seating capacity**; Gate B is currently the fastest entry point.`;
        reasoningText = "Default general stadium operations retrieval mapping.";
      }

      // Live Gemini call if API Key is inputted
      if (geminiApiKey) {
        try {
          const promptWithContext = `You are ArenaFlow Assistant, an AI system for MetLife Stadium during the FIFA World Cup 2026.
          Match context: Argentina vs France, Quarter-Final 1, 19 July 2026.
          Fan Context: Name: Alex Morgan, Seat: Section 124, Row 12, Seat 4. Allocated Entrance Gate: Gate B.
          Stadium operations context:
          - North Stand: Normal flow (density 32%)
          - South Stand: Heavy congestion (density 89%, long restroom lines)
          - East Stand: Moderate flow (density 68%)
          - West Stand: Normal flow (density 45%)
          - Concession Stand #8: carbonation leak under repair.
          - Concessions: Burgers (15 min wait), Pretzels (4 min wait), Soda (2 min wait).
          
          User is asking: "${query}".
          Respond to the user with helpful, precise stadium directions or solutions. Write in rich markdown format with emojis.`;
          
          const apiResponse = await callGeminiAPI(promptWithContext);
          if (apiResponse) {
            aiText = apiResponse;
            reasoningText = "Live Google Gemini AI 1.5 Flash Model response.";
          }
        } catch (err) {
          console.error("Gemini API call failed, using offline fallback:", err);
          aiText += "\n\n*(Note: Gemini Live API key failed. Displaying offline simulated response)*";
        }
      }

      const aiMessage = {
        sender: 'ai',
        text: aiText,
        reasoning: reasoningText
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleOrderFood = (foodName, price) => {
    const newOrder = {
      id: orders.length + 1,
      name: foodName,
      price: price,
      status: 'Preparing',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setOrders([...orders, newOrder]);
    setActiveOrderMsg(`Ordered ${foodName}! Head to pick up when notified.`);
    setTimeout(() => {
      setActiveOrderMsg('');
    }, 3000);
  };

  const handleScanTicket = (codeToScan = null) => {
    const code = codeToScan || scannedTicketCode;
    if (!code.trim()) return;

    setIsScanning(true);
    setScanFeedback(null);

    setTimeout(() => {
      const upperCode = code.toUpperCase();
      let matchedId = null;
      let matchedName = "";

      if (upperCode.includes("FIFA") || upperCode.includes("ARGFRA") || upperCode.includes("METLIFE")) {
        matchedId = "metlife";
        matchedName = "MetLife Stadium (USA)";
      } else if (upperCode.includes("CRIC") || upperCode.includes("IND") || upperCode.includes("MODI")) {
        matchedId = "narendra_modi";
        matchedName = "Narendra Modi Stadium (India)";
      } else if (upperCode.includes("WEMB") || upperCode.includes("CHEARS") || upperCode.includes("WEMBLEY")) {
        matchedId = "wembley";
        matchedName = "Wembley Stadium (UK)";
      }

      setIsScanning(false);

      if (matchedId) {
        setCurrentStadiumId(matchedId);
        setSelectedSector(matchedId === 'narendra_modi' ? 'North Stand' : 'East Stand');
        setCurrentRouteStep(0); // Reset wayfinding to step 0 on scan
        setScanFeedback({
          type: 'success',
          message: `🎟️ Ticket scanned successfully! Active context updated to ${matchedName}. Seat location and route guide unlocked.`
        });
      } else {
        setScanFeedback({
          type: 'error',
          message: "❌ Unrecognized ticket barcode. Please check your credentials or tap a demo ticket preset."
        });
      }
    }, 1200);
  };

  return (
    <div id="root">
      {/* App Header */}
      <header className="app-header">
        <div className="brand">
          <Activity className="brand-icon" size={28} />
          <h1 className="brand-title">ArenaFlow AI</h1>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{activeStadium.id === 'narendra_modi' ? '🏏' : '⚽'} {activeStadium.name}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>▼</span>
            </button>

            {isSearchOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                width: '320px',
                background: 'rgba(15, 23, 42, 0.98)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                zIndex: 1000,
                padding: '0.75rem',
                backdropFilter: 'blur(20px)'
              }}>
                {/* Search Input */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '0.35rem 0.5rem', marginBottom: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.8rem', marginRight: '0.4rem', opacity: 0.5 }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search by name, location, sport..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.78rem', width: '100%' }}
                  />
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  {['All', 'North America', 'Europe', 'South Asia'].map(reg => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      style={{
                        background: selectedRegion === reg ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${selectedRegion === reg ? 'var(--color-primary)' : 'var(--border-color)'}`,
                        color: selectedRegion === reg ? '#fff' : 'var(--text-secondary)',
                        fontSize: '0.65rem',
                        fontWeight: '600',
                        borderRadius: '4px',
                        padding: '0.2rem 0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      {reg}
                    </button>
                  ))}
                </div>

                {/* Stadium List */}
                <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {Object.values(STADIUM_CONFIGS)
                    .filter(s => {
                      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                            s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            s.sport.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesRegion = selectedRegion === 'All' || s.region === selectedRegion;
                      return matchesSearch && matchesRegion;
                    })
                    .map(stadium => (
                      <div
                        key={stadium.id}
                        onClick={() => {
                          setCurrentStadiumId(stadium.id);
                          setSelectedSector(stadium.id === 'narendra_modi' ? 'North Stand' : 'East Stand');
                          setIsSearchOpen(false);
                        }}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: currentStadiumId === stadium.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                          border: `1px solid ${currentStadiumId === stadium.id ? 'rgba(59, 130, 246, 0.2)' : 'transparent'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (currentStadiumId !== stadium.id) {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = currentStadiumId === stadium.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent';
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#fff' }}>{stadium.id === 'narendra_modi' ? '🏏' : '⚽'} {stadium.name}</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{stadium.location}, {stadium.country}</div>
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: '600' }}>{stadium.sport.split(' ')[0]}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Stats Ticker */}
        <div className="header-status-ticker">
          <div className="status-item">
            <span className="status-dot live"></span>
            <span className="status-label">Match:</span>
            <span className="status-val">{activeStadium.currentMatch}</span>
          </div>
          <div className="status-item">
            <span className="status-dot"></span>
            <span className="status-label">Stadium Scan:</span>
            <span className="status-val">{activeStadium.currentScan}</span>
          </div>
          <div className="status-item">
            <CloudRain size={16} className="status-dot warning" style={{background: 'none', boxShadow: 'none'}} />
            <span className="status-label">Weather:</span>
            <span className="status-val">{activeStadium.weather}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="navigation-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'operations' ? 'active' : ''}`}
            onClick={() => setActiveTab('operations')}
          >
            <Shield size={16} />
            Operations Command
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'fan' ? 'active' : ''}`}
            onClick={() => setActiveTab('fan')}
          >
            <User size={16} />
            Fan Portal
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'assistant' ? 'active' : ''}`}
            onClick={() => setActiveTab('assistant')}
          >
            <MessageSquare size={16} />
            AI Assistant
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Tab 1: Operations Dashboard */}
        {activeTab === 'operations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* KPI Banner Grid */}
            <div className="dashboard-grid">
              <div className="glass-card stats-card">
                <div className="stats-header">
                  <div>
                    <span className="stats-label">TOTAL SCAN RATE</span>
                    <h3 className="stats-value">73.8%</h3>
                  </div>
                  <div className="stats-icon-wrapper success">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="stats-trend up">
                  <Check size={12} />
                  <span>+4.2% scanned in last 10 mins</span>
                </div>
              </div>

              <div className="glass-card stats-card">
                <div className="stats-header">
                  <div>
                    <span className="stats-label">ACTIVE INCIDENTS</span>
                    <h3 className="stats-value">
                      {incidents.filter(i => i.status !== 'Completed').length}
                    </h3>
                  </div>
                  <div className="stats-icon-wrapper danger">
                    <AlertTriangle size={20} />
                  </div>
                </div>
                <div className="stats-trend down">
                  <span>2 High-Priority dispatched</span>
                </div>
              </div>

              <div className="glass-card stats-card">
                <div className="stats-header">
                  <div>
                    <span className="stats-label">SECURITY LINE WAIT</span>
                    <h3 className="stats-value">4.2m</h3>
                  </div>
                  <div className="stats-icon-wrapper primary">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="stats-trend up">
                  <span>Fastest at East Gate B</span>
                </div>
              </div>

              <div className="glass-card stats-card">
                <div className="stats-header">
                  <div>
                    <span className="stats-label">CONCESSION CONGESTION</span>
                    <h3 className="stats-value">Moderate</h3>
                  </div>
                  <div className="stats-icon-wrapper warning">
                    <Coffee size={20} />
                  </div>
                </div>
                <div className="stats-trend">
                  <span>Avg queue: 8.5 minutes</span>
                </div>
              </div>
            </div>

            {/* ── Game Simulation Control Panel ── */}
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div className="card-header" style={{ marginBottom: '1rem' }}>
                <h2 className="card-title">
                  <Play size={20} style={{ color: 'var(--color-warning)' }} />
                  Match-Day Simulation Engine
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {simPhase ? (
                    <>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-danger)', display: 'inline-block', boxShadow: '0 0 8px var(--color-danger)', animation: 'pulse 1.2s ease-in-out infinite' }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 700 }}>SIMULATION RUNNING</span>
                      <button
                        onClick={() => { setSimPhase(null); setSimTick(0); }}
                        style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: '6px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                      >Reset</button>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Select a phase to simulate live crowd data</span>
                  )}
                </div>
              </div>

              {/* Phase Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: simPhase ? '1rem' : 0 }}>
                {Object.entries(SIM_PHASES).map(([key, phase]) => (
                  <button
                    key={key}
                    onClick={() => { setSimPhase(key); setSimTick(0); }}
                    style={{
                      background: simPhase === key ? `rgba(59,130,246,0.15)` : 'var(--bg-tertiary)',
                      border: `1.5px solid ${simPhase === key ? phase.color : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 0.5rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.25s ease',
                      boxShadow: simPhase === key ? `0 0 16px ${phase.color}40` : 'none',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{phase.icon}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: simPhase === key ? '#fff' : 'var(--text-secondary)', lineHeight: 1.2 }}>{phase.label}</span>
                  </button>
                ))}
              </div>

              {/* Active Phase Status Banner */}
              {simPhase && (
                <div style={{
                  background: `linear-gradient(90deg, ${SIM_PHASES[simPhase].color}18, transparent)`,
                  border: `1px solid ${SIM_PHASES[simPhase].color}50`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem 1rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{SIM_PHASES[simPhase].icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: SIM_PHASES[simPhase].color }}>{SIM_PHASES[simPhase].label} — ACTIVE</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{SIM_PHASES[simPhase].desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem' }}>
                    {Object.entries(simulatedSectorData).map(([name, data]) => (
                      <div key={name} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1.1rem', fontWeight: 800,
                          color: data.colorClass === 'sector-high' ? 'var(--color-danger)' : data.colorClass === 'sector-medium' ? 'var(--color-warning)' : 'var(--color-success)'
                        }}>{data.density}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{name.replace(' Stand', '')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map and Incident Logger Layout */}
            <div className="operations-center-layout">
              {/* Stadium Map Column */}
              <div className="glass-card map-control-panel">
                <div className="card-header">
                  <h2 className="card-title">
                    <Compass size={20} style={{ color: 'var(--color-primary)' }} />
                    Live Crowd Density Heatmap
                  </h2>
                  <div className="legend-item" style={{ fontSize: '0.75rem' }}>
                    <span className="status-dot"></span>
                    <span>Click sector to view live feed telemetry</span>
                  </div>
                </div>

                <div className="map-visualizer">
                  <svg className="stadium-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Dynamic Stadium Background & Playing Field */}
                    {renderStadiumMapElements(currentStadiumId, false)}
                    
                    {/* North Stand Sector */}
                    <path 
                      className={`stadium-sector ${selectedSector === 'North Stand' ? 'sector-selected' : ''} ${simulatedSectorData['North Stand'].colorClass}`}
                      d="M100 25 C150 18, 250 18, 300 25 L260 90 C230 85, 170 85, 140 90 Z" 
                      onClick={() => setSelectedSector('North Stand')}
                    />
                    
                    {/* East Stand Sector */}
                    <path 
                      className={`stadium-sector ${selectedSector === 'East Stand' ? 'sector-selected' : ''} ${simulatedSectorData['East Stand'].colorClass}`}
                      d="M305 32 C375 75, 375 225, 305 268 L265 198 C280 178, 280 122, 265 102 Z" 
                      onClick={() => setSelectedSector('East Stand')}
                    />

                    {/* South Stand Sector */}
                    <path 
                      className={`stadium-sector ${selectedSector === 'South Stand' ? 'sector-selected' : ''} ${simulatedSectorData['South Stand'].colorClass}`}
                      d="M100 275 C150 282, 250 282, 300 275 L260 210 C230 215, 170 215, 140 210 Z" 
                      onClick={() => setSelectedSector('South Stand')}
                    />

                    {/* West Stand Sector */}
                    <path 
                      className={`stadium-sector ${selectedSector === 'West Stand' ? 'sector-selected' : ''} ${simulatedSectorData['West Stand'].colorClass}`}
                      d="M95 32 C25 75, 25 225, 95 268 L135 198 C120 178, 120 122, 135 102 Z" 
                      onClick={() => setSelectedSector('West Stand')}
                    />
                  </svg>
                </div>

                <div className="sector-legend">
                  <div className="legend-item">
                    <span className="legend-color sector-high"></span>
                    <span>Heavy congestion (&gt;80%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color sector-medium"></span>
                    <span>Moderate (&gt;50%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color sector-low"></span>
                    <span>Normal (&lt;50%)</span>
                  </div>
                </div>

                {/* Selected Sector Telemetry Info */}
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--heading)', fontSize: '1rem', marginBottom: '0.5rem', color: '#fff' }}>
                    Telemetry Feed: {selectedSector}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>Live Crowd Density: </span>
                      <span style={{ fontWeight: '600', color: simulatedSectorData[selectedSector].colorClass === 'sector-high' ? 'var(--color-danger)' : simulatedSectorData[selectedSector].colorClass === 'sector-medium' ? 'var(--color-warning)' : 'var(--color-success)' }}>
                        {simulatedSectorData[selectedSector].density}
                        {simPhase && <span style={{ fontSize: '0.65rem', color: 'var(--color-primary)', marginLeft: '0.4rem', fontWeight: 400 }}>● LIVE</span>}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>Status: </span>
                      <span style={{ fontWeight: '600' }}>{simulatedSectorData[selectedSector].status}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>Security Level: </span>
                      <span style={{ fontWeight: '600' }}>{simulatedSectorData[selectedSector].security}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>Sect. Climate: </span>
                      <span style={{ fontWeight: '600' }}>{simulatedSectorData[selectedSector].temp}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Incidents & Dispatch Log Column */}
              <div className="glass-card incident-control-panel">
                <div className="card-header">
                  <h2 className="card-title">
                    <Shield size={20} style={{ color: 'var(--color-danger)' }} />
                    AI-Assisted Operations Dispatcher
                  </h2>
                </div>

                {/* API Key Configurations */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <Key size={16} style={{ color: 'var(--color-primary)' }} />
                  <input
                    type="password"
                    placeholder="Enter Gemini API Key for live AI Dispatch..."
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.8rem' }}
                  />
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    {geminiApiKey ? 'Live Mode Active' : 'Simulated fallback'}
                  </div>
                </div>

                {/* Report New Incident Form */}
                <form onSubmit={handleAddIncident} style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 600 }}>Log Match-Day Incident</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Incident Location (e.g. Block 102, Concourse E)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. South Turnstile Gate C" 
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Describe Incident Details</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Explain what is happening. Generative AI will auto-categorize, prioritize, and write dispatch coordinates." 
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isDispatching}>
                    {isDispatching ? (
                      <>
                        <Zap size={16} className="brand-icon" style={{ animation: 'spin 1s linear infinite' }} />
                        Analyzing with Generative AI...
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Submit & AI Auto-Dispatch
                      </>
                    )}
                  </button>
                </form>

                {/* Incidents Feed */}
                <div>
                  <h3 style={{ fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 600 }}>Active Incident Logs</h3>
                  <div className="incident-feed-list">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="incident-item">
                        <div className="incident-item-header">
                          <span className="incident-loc">{incident.location}</span>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{incident.timestamp}</span>
                            <span className={`incident-badge badge-${incident.priority}`}>
                              {incident.priority}
                            </span>
                          </div>
                        </div>
                        <p className="incident-desc">{incident.description}</p>
                        
                        {/* Auto Dispatch display */}
                        <div className="incident-dispatch-box">
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                            <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>AUTO-DISPATCH LOG</span>
                            <span style={{ color: 'var(--text-secondary)' }}>Category: **{incident.category}**</span>
                          </div>
                          <div>
                            <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '500' }}>Assigned Crew: </span>
                            <span className="dispatch-staff">{incident.dispatch.staff}</span>
                          </div>
                          <div>
                            <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '500' }}>Directives: </span>
                            <span className="dispatch-instruction">{incident.dispatch.instruction}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fan Experience Portal */}
        {activeTab === 'fan' && (
          <div className="fan-portal-layout">

            {/* ── Live Route Visualizer Panel ── */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="card-header">
                <h2 className="card-title">
                  <Navigation size={20} style={{ color: 'var(--color-primary)' }} />
                  Live Route Visualizer
                </h2>
                <span style={{
                  fontSize: '0.7rem', background: 'rgba(16,185,129,0.15)',
                  color: 'var(--color-success)', border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '6px', padding: '0.2rem 0.5rem', fontWeight: 600
                }}>● TRACKING</span>
              </div>

              {/* SVG Map with animated route overlay */}
              <div className="map-visualizer" style={{ position: 'relative' }}>
                <svg className="stadium-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dynamic Stadium Background & Playing Field */}
                  {renderStadiumMapElements(currentStadiumId, true)}

                  {/* Dim sector fills */}
                  {activeStadium.sectors.map((s, i) => {
                    const paths = [
                      "M100 25 C150 18, 250 18, 300 25 L260 90 C230 85, 170 85, 140 90 Z",
                      "M305 32 C375 75, 375 225, 305 268 L265 198 C280 178, 280 122, 265 102 Z",
                      "M100 275 C150 282, 250 282, 300 275 L260 210 C230 215, 170 215, 140 210 Z",
                      "M95 32 C25 75, 25 225, 95 268 L135 198 C120 178, 120 122, 135 102 Z"
                    ];
                    const opacityMap = { 'sector-low': 0.08, 'sector-medium': 0.14, 'sector-high': 0.22 };
                    const colorMap = { 'sector-low': '#10b981', 'sector-medium': '#f59e0b', 'sector-high': '#ef4444' };
                    return (
                      <path key={i} d={paths[i]}
                        fill={colorMap[s.colorClass]}
                        fillOpacity={opacityMap[s.colorClass]}
                        stroke={colorMap[s.colorClass]}
                        strokeOpacity="0.2"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Neon route path — draw lines between all visited waypoints */}
                  {activeStadium.svgRoute.slice(0, currentRouteStep + 1).map((pt, i, arr) => {
                    if (i === 0) return null;
                    const prev = arr[i - 1];
                    return (
                      <line key={`line-${i}`}
                        x1={prev.x} y1={prev.y} x2={pt.x} y2={pt.y}
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    );
                  })}

                  {/* Waypoint circles — visited ones are filled, future ones are ghosts */}
                  {activeStadium.svgRoute.map((pt, i) => {
                    const isVisited = i <= currentRouteStep;
                    const isCurrent = i === currentRouteStep;
                    return (
                      <g key={`wp-${i}`}>
                        {/* Outer glow ring for current position */}
                        {isCurrent && (
                          <circle cx={pt.x} cy={pt.y} r="14" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" strokeWidth="1">
                            <animate attributeName="r" values="10;17;10" dur="1.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite" />
                          </circle>
                        )}
                        {/* Main dot */}
                        <circle cx={pt.x} cy={pt.y} r={isCurrent ? 7 : 5}
                          fill={isVisited ? (isCurrent ? '#3b82f6' : '#10b981') : 'rgba(255,255,255,0.12)'}
                          stroke={isVisited ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
                          strokeWidth="1.5"
                        />
                        {/* Label text */}
                        <text x={pt.x} y={pt.y - 12}
                          textAnchor="middle"
                          fontSize="8"
                          fill={isVisited ? '#fff' : 'rgba(255,255,255,0.3)'}
                          fontFamily="system-ui, sans-serif"
                          fontWeight={isCurrent ? '700' : '400'}
                        >
                          {pt.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Step progress indicator */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0 0.25rem' }}>
                {activeStadium.svgRoute.map((pt, i) => (
                  <React.Fragment key={i}>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', flex: 1
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: i <= currentRouteStep ? (i === currentRouteStep ? 'var(--color-primary)' : 'var(--color-success)') : 'var(--bg-tertiary)',
                        border: `2px solid ${i <= currentRouteStep ? 'transparent' : 'var(--border-color)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700, color: '#fff',
                        boxShadow: i === currentRouteStep ? '0 0 12px rgba(59,130,246,0.6)' : 'none',
                        transition: 'all 0.4s ease'
                      }}>
                        {i < currentRouteStep ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: '0.6rem', color: i <= currentRouteStep ? 'var(--text-primary)' : 'var(--text-secondary)', textAlign: 'center' }}>
                        {pt.label}
                      </span>
                    </div>
                    {i < activeStadium.svgRoute.length - 1 && (
                      <div style={{
                        height: 2, flex: 2,
                        background: i < currentRouteStep ? 'var(--color-success)' : 'var(--border-color)',
                        borderRadius: 2, marginBottom: 18, transition: 'background 0.4s ease'
                      }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                <strong style={{ color: 'var(--color-primary)' }}>How it works:</strong> Route dots are computed from the stadium's spatial waypoint registry. In production, the fan's GPS/Bluetooth coordinates update this path in real-time using crowd-density-aware pathfinding.
              </p>
            </div>

            {/* Phone Screen Mockup */}
            <div className="phone-mockup">
              <div className="phone-notch">
                <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 600 }}>18:56 PM</span>
                <div className="phone-camera"></div>
              </div>
              <div className="phone-screen">
                
                {/* Profile Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Welcome back</span>
                    <h3 style={{ fontFamily: 'var(--heading)', fontSize: '1rem', fontWeight: 700 }}>{ticketInfo.holder}</h3>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                </div>

                {/* Digital Ticket */}
                <div className="fan-ticket-card">
                  <div className="ticket-header">
                    <span className="ticket-title">{activeStadium.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>ACTIVE</span>
                  </div>
                  <div className="ticket-matchup">
                    <span className="team-abbr">
                      {(() => {
                        const parts = activeStadium.currentMatch.split(' (')[0].split(' vs ');
                        const team1 = parts[0] || 'HOME';
                        if (team1.toLowerCase().includes('argentina')) return 'ARG';
                        if (team1.toLowerCase().includes('india')) return 'IND';
                        if (team1.toLowerCase().includes('chelsea')) return 'CHE';
                        return team1.substring(0, 3).toUpperCase();
                      })()}
                    </span>
                    <span className="match-vs">VS</span>
                    <span className="team-abbr">
                      {(() => {
                        const parts = activeStadium.currentMatch.split(' (')[0].split(' vs ');
                        const team2 = parts[1] || 'AWAY';
                        if (team2.toLowerCase().includes('france')) return 'FRA';
                        if (team2.toLowerCase().includes('australia')) return 'AUS';
                        if (team2.toLowerCase().includes('arsenal')) return 'ARS';
                        return team2.substring(0, 3).toUpperCase();
                      })()}
                    </span>
                  </div>
                  <div className="ticket-meta-grid">
                    {(() => {
                      const seatParts = ticketInfo.seat.split(', ');
                      const seatSec = seatParts[0] || '';
                      const seatRow = seatParts[1] || '';
                      const seatNo = seatParts[2] || '';
                      return (
                        <>
                          <div>
                            <div className="ticket-meta-label">SECTOR / BLOCK</div>
                            <div className="ticket-meta-val" style={{ fontSize: '0.75rem' }}>{seatSec.replace('Sec ', '').replace('Block ', '')}</div>
                          </div>
                          <div>
                            <div className="ticket-meta-label">ROW</div>
                            <div className="ticket-meta-val">{seatRow ? seatRow.replace('Row ', '') : 'A'}</div>
                          </div>
                          <div>
                            <div className="ticket-meta-label">SEAT</div>
                            <div className="ticket-meta-val">{seatNo ? seatNo.replace('Seat ', '') : '1'}</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="ticket-meta-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                      <div className="ticket-meta-label">ENTRANCE</div>
                      <div className="ticket-meta-val" style={{ fontSize: '0.75rem' }}>{ticketInfo.gate.split(' (')[0]}</div>
                    </div>
                    <div>
                      <div className="ticket-meta-label">START TIME</div>
                      <div className="ticket-meta-val">19:00 PM</div>
                    </div>
                  </div>
                  <div className="ticket-barcode-box">
                    <div className="barcode-sim"></div>
                    <span className="barcode-text">{ticketInfo.barcode}</span>
                  </div>
                </div>

                {/* Dynamic Smart Navigation Guide */}
                <div className="navigation-guide-card">
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Navigation size={14} style={{ color: 'var(--color-primary)' }} />
                    Live Wayfinding ({activeStadium.ticket.gate.split(' ')[0]} Route)
                  </h4>
                  
                  {activeStadium.wayfinding.map((stepItem, idx) => {
                    const isDone = currentRouteStep > idx;
                    const isActive = currentRouteStep === idx;
                    return (
                      <div key={idx} className={`nav-route-step ${isDone ? 'done' : isActive ? 'active' : ''}`}>
                        <div className="nav-step-icon">
                          {isDone ? <Check size={10} /> : isActive ? <Flame size={10} /> : idx + 1}
                        </div>
                        <div className="nav-step-text">
                          <div className="nav-step-title">{stepItem.title}</div>
                          <div className="nav-step-desc">{stepItem.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Concession Stand Menu */}
                <div className="food-preorder-section">
                  <h4 style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Utensils size={14} style={{ color: 'var(--color-warning)' }} />
                    Pre-Order Concessions (Stall #3)
                  </h4>
                  {activeOrderMsg && (
                    <div style={{ background: 'var(--color-success-glow)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.75rem', padding: '0.4rem', borderRadius: 4, textAlign: 'center' }}>
                      {activeOrderMsg}
                    </div>
                  )}

                  {concessionsList.map((item) => (
                    <div key={item.id} className="food-item-row">
                      <div className="food-info">
                        <span className="food-name">{item.name}</span>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className="food-price">{item.price}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.calories}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <span className="food-queue-time">
                          <Clock size={10} />
                          {item.wait} wait
                        </span>
                        <button 
                          className="btn" 
                          onClick={() => handleOrderFood(item.name, item.price)}
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', background: 'var(--color-primary)', borderRadius: '4px', color: '#fff' }}
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fan Active Orders Feed */}
                {orders.length > 0 && (
                  <div style={{ background: 'rgba(0,0,0,0.15)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>Your active pickup vouchers</h5>
                    {orders.map((ord) => (
                      <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>{ord.name}</span>
                          <span style={{ color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>({ord.time})</span>
                        </div>
                        <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>{ord.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ticket Scanning & Wayfinding Unlock Card */}
            <div className="glass-card">
              <div className="card-header">
                <h2 className="card-title">
                  <Key size={20} style={{ color: 'var(--color-success)' }} />
                  Smart Ticket Scanner
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                Scan or enter spectator ticket codes to automatically match the stadium context, sync the mobile device, and display seating wayfinding route guidelines.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Manual input / scanner */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', position: 'relative' }}>
                  {isScanning && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(11,15,25,0.85)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', zIndex: 10, borderRadius: 'var(--radius-sm)'
                    }}>
                      <div className="loader" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                        📡 Parsing Barcode RFID...
                      </div>
                    </div>
                  )}

                  <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Enter Digital Ticket Code</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. FIFA-2026-ARGFRA-99824" 
                      value={scannedTicketCode}
                      onChange={(e) => setScannedTicketCode(e.target.value)}
                      style={{ flex: 1, marginBottom: 0 }}
                    />
                    <button 
                      onClick={() => handleScanTicket()} 
                      className="btn btn-primary" 
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      Scan
                    </button>
                  </div>

                  {/* Scan presets */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Tap a demo ticket to scan:</span>
                    <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
                      {Object.values(STADIUM_CONFIGS).map(st => (
                        <button
                          key={st.id}
                          onClick={() => {
                            setScannedTicketCode(st.ticket.barcode);
                            handleScanTicket(st.ticket.barcode);
                          }}
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            padding: '0.4rem',
                            textAlign: 'left',
                            color: '#fff',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        >
                          <div>
                            <span style={{ fontWeight: 600 }}>{st.name} Ticket</span>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{st.ticket.holder} - Seat {st.ticket.seat.split(',')[0]}</div>
                          </div>
                          <span style={{ fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: '0.65rem' }}>{st.ticket.barcode}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scan Feedback banner */}
                {scanFeedback && (
                  <div style={{
                    background: scanFeedback.type === 'success' ? 'var(--color-success-glow)' : 'var(--color-danger-glow)',
                    border: `1px solid ${scanFeedback.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
                    color: scanFeedback.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    lineHeight: '1.4'
                  }}>
                    {scanFeedback.message}
                  </div>
                )}
              </div>
            </div>

            {/* Fan Simulator Dashboard Controls */}
            <div className="glass-card">
              <div className="card-header">
                <h2 className="card-title">
                  <User size={20} style={{ color: 'var(--color-primary)' }} />
                  Attendee Experience Simulator
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                This portal displays what the spectator experiences on their mobile web device inside the stadium. Interact with the simulation controls below to update the mobile UI.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Simulate Fan Movement</h4>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className={`btn ${currentRouteStep === 1 ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setCurrentRouteStep(1)}
                      style={{ flex: 1, padding: '0.5rem' }}
                    >
                      Step 1: Lower Promenade
                    </button>
                    <button 
                      className={`btn ${currentRouteStep === 2 ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setCurrentRouteStep(2)}
                      style={{ flex: 1, padding: '0.5rem' }}
                    >
                      Step 2: Section 124 entry
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Smart Notifications Trigger</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Simulate stadium operations pushing location alerts to the fan device.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        setActiveOrderMsg("🚨 Traffic Alert: High crowd density detected in East Corridors. Avoid Concourse Escalators.");
                        setTimeout(() => setActiveOrderMsg(""), 5000);
                      }}
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                    >
                      Push Crowding Alert
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        if (orders.length > 0) {
                          const updated = [...orders];
                          updated[0].status = 'READY FOR PICKUP';
                          setOrders(updated);
                          setActiveOrderMsg("🍔 Order status updated: Head to concession stand #3 to claim your meal!");
                          setTimeout(() => setActiveOrderMsg(""), 5000);
                        } else {
                          alert("Place a food pre-order first inside the phone screen mockup.");
                        }
                      }}
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                    >
                      Trigger Food Ready Notification
                    </button>
                  </div>
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>GenAI Integration Highlight:</strong>
                  <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    In a fully integrated setup, the fan's pre-orders are tracked against live queue sensors. The wayfinding logic updates paths dynamically by calculating the density values shown in the **Operations Command** tab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AI Assistant */}
        {activeTab === 'assistant' && (
          <div className="glass-card ai-assistant-layout">
            
            {/* Chat Area Column */}
            <div className="chat-room-container">
              <div className="card-header">
                <h2 className="card-title">
                  <MessageSquare size={20} style={{ color: 'var(--color-primary)' }} />
                  Interactive GenAI Assistant Engine
                </h2>
                
                {/* Gemini Live API settings */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <Key size={14} style={{ color: 'var(--color-primary)' }} />
                  <input
                    type="password"
                    placeholder="Input Gemini API Key to enable live answers..."
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.75rem', width: 220 }}
                  />
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                    {geminiApiKey ? 'Live API mode' : 'Offline sandbox'}
                  </div>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="chat-messages-feed">
                {messages.map((msg, index) => (
                  <div key={index} className={`message-bubble ${msg.sender}`}>
                    {msg.sender === 'ai' && (
                      <div className="ai-reasoning-details">
                        <Zap size={10} style={{ color: 'var(--color-primary)' }} />
                        <span>AI reasoning: {msg.reasoning}</span>
                      </div>
                    )}
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="message-bubble ai" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', padding: '0.8rem 1.2rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)', animation: 'beacon 1.2s infinite' }}></span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)', animation: 'beacon 1.2s infinite 0.2s' }}></span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)', animation: 'beacon 1.2s infinite 0.4s' }}></span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat input box */}
              <div className="chat-input-row">
                <input 
                  type="text" 
                  className="chat-input" 
                  placeholder="Ask about directions, queues, safety reports, stadium policies..." 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  disabled={isTyping}
                />
                <button className="btn btn-primary" onClick={() => handleSendChat()} disabled={isTyping}>
                  <Send size={16} />
                  Send
                </button>
              </div>
            </div>

            {/* AI Settings Column */}
            <div className="ai-control-panel">
              {/* Context variables panel */}
              <div className="glass-card" style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem' }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', fontFamily: 'var(--heading)', color: '#fff' }}>
                  Model Context Injection
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                  The GenAI prompt automatically inherits active game telemetry to provide contextually-accurate guidelines.
                </p>

                <ul className="info-bullet-list">
                  <li><strong>Active User:</strong> Alex Morgan (Sec 124)</li>
                  <li><strong>Assigned Entrypoint:</strong> East Gate B</li>
                  <li><strong>Ticket Code:</strong> FIFA-2026-ARGFRA</li>
                  <li><strong>Active Halftime Congestion:</strong> South Stand</li>
                  <li><strong>Nearest Restrooms:</strong> Sec 124 (Wait time: 2 mins)</li>
                </ul>
              </div>

              {/* Preset prompt helper */}
              <div className="glass-card" style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem' }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', fontFamily: 'var(--heading)', color: '#fff' }}>
                  Quick Preset Actions
                </h3>
                <div className="preset-prompts-grid">
                  {presetPrompts.map((promptText, i) => (
                    <button 
                      key={i} 
                      className="preset-prompt-btn"
                      onClick={() => handleSendChat(promptText)}
                      disabled={isTyping}
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              </div>

              {/* Developer Tip */}
              <div style={{ background: 'var(--color-primary-glow)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', lineHeight: '1.45' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                  <Zap size={12} />
                  Developer Insights
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  This panel demonstrates how few-shot prompt injection aligns natural language queries directly with backend database parameters (e.g. mapping tickets to gate directories).
                </p>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default App;
