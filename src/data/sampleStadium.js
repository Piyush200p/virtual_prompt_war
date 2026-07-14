export const sampleStadiumJSON = `{
  "id": "lusail",
  "name": "Lusail Iconic Stadium",
  "location": "Lusail, Doha",
  "country": "Qatar",
  "region": "Middle East",
  "role": "Semi-Final Venue",
  "capacity": "88,966",
  "currentMatch": "Argentina vs France (World Cup Final)",
  "currentScan": "96.4% (85,800 Fans)",
  "weather": "25°C (Breezy)",
  "sustainabilityScore": 92,
  "svgRoute": [
    { "x": 50, "y": 250, "label": "West Gate Check", "step": 0 },
    { "x": 180, "y": 200, "label": "VIP Lobby", "step": 1 },
    { "x": 200, "y": 140, "label": "Section 104", "step": 2 }
  ],
  "accessibilityRoute": [
    { "x": 50, "y": 250, "label": "West Gate ADA", "step": 0 },
    { "x": 120, "y": 220, "label": "Elevator Hall 1", "step": 1 },
    { "x": 200, "y": 140, "label": "Section 104 ADA", "step": 2 }
  ],
  "ticket": {
    "holder": "Alex Morgan",
    "seat": "Sec 104, Row 5, Seat 14",
    "gate": "Gate A (West Gate)",
    "barcode": "FIFA-2022-LUSAIL-10029"
  },
  "sectors": [
    { "name": "North Stand", "density": "89%", "status": "Heavy Flow", "security": "Level 2", "temp": "25°C", "colorClass": "sector-high" },
    { "name": "East Stand", "density": "94%", "status": "Severe Congestion", "security": "Level 3", "temp": "26°C", "colorClass": "sector-high" },
    { "name": "South Stand", "density": "52%", "status": "Moderate Flow", "security": "Level 2", "temp": "24°C", "colorClass": "sector-medium" },
    { "name": "West Stand", "density": "31%", "status": "Normal Flow", "security": "Level 1", "temp": "24°C", "colorClass": "sector-low" }
  ],
  "concessions": [
    { "id": 1, "name": "Shawarma Wrap Special", "price": "$9.50", "wait": "8 mins", "calories": "410 kcal", "sustainability": ["Local-Source"] },
    { "id": 2, "name": "Hummus & Pita Plate", "price": "$6.00", "wait": "3 mins", "calories": "280 kcal", "sustainability": ["Plant-Based", "Zero-Waste"] },
    { "id": 3, "name": "Karak Cardamom Tea", "price": "$4.50", "wait": "2 mins", "calories": "90 kcal", "sustainability": ["Zero-Plastic"] }
  ],
  "wayfinding": [
    { "step": 0, "title": "Gate A West Gate", "desc": "NFC Card scan successfully completed at main entry." },
    { "step": 1, "title": "Golden Ring VIP Promenade", "desc": "Proceed past security checkpoint towards section 104 escalators." },
    { "step": 2, "title": "Section 104 VIP Tier", "desc": "Walk straight ahead. Row 5 seats are situated directly behind player dugouts." }
  ],
  "accessibilityWayfinding": [
    { "step": 0, "title": "Gate A ADA Entry", "desc": "Access via zero-step wheelchair ramp." },
    { "step": 1, "title": "VIP West Elevator", "desc": "Take Elevator 4 to Level 1 VIP Suite corridor." },
    { "step": 2, "title": "Section 104 ADA Box", "desc": "Wheelchair-accessible seating is located directly ahead." }
  ],
  "transportation": [
    { "type": "Metro Red Line", "wait": "5 mins", "eco": "Low Carbon 🌱" },
    { "type": "Park & Ride Shuttle", "wait": "8 mins", "eco": "Low Carbon 🌱" },
    { "type": "Lounge Rideshare", "wait": "15 mins", "eco": "High Carbon 🚗" }
  ],
  "volunteerTasks": [
    { "id": 1, "task": "Direct fans from West Gate ADA to elevators", "status": "Pending", "sector": "West Stand", "priority": "High" },
    { "id": 2, "task": "Monitor Hummus Stand #2 compost bin sorting", "status": "Completed", "sector": "East Stand", "priority": "Medium" }
  ]
}`;
