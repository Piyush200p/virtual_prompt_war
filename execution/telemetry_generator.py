import os
import sys

def enrich_stadiums():
    stadiums_file = r"d:\Project\virtual_prompt_war\src\data\stadiums.js"
    print(f"Reading {stadiums_file}...")
    
    if not os.path.exists(stadiums_file):
        print(f"Error: {stadiums_file} not found.")
        sys.exit(1)
        
    with open(stadiums_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will define our enriched configurations for the four stadiums in javascript.
    # To keep this process robust and deterministic, we will overwrite the file with the enriched configuration.
    
    enriched_js = """export const STADIUM_CONFIGS = {
  metlife: {
    id: 'metlife',
    name: 'MetLife Stadium',
    location: 'East Rutherford, NJ',
    country: 'USA',
    region: 'North America',
    sport: 'Soccer (FIFA World Cup 2026)',
    capacity: '82,500',
    currentMatch: 'Argentina vs France (Quarter-Final 1)',
    currentScan: '73.8% (60,885 Fans)',
    weather: '22°C (Clear)',
    svgRoute: [
      { x: 340, y: 150, label: 'Gate B', step: 0 },
      { x: 290, y: 150, label: 'East Promenade', step: 1 },
      { x: 220, y: 140, label: 'Section 124', step: 2 },
    ],
    accessibilityRoute: [
      { x: 340, y: 150, label: 'Gate B (ADA Check)', step: 0 },
      { x: 280, y: 175, label: 'Elevator Lobby B', step: 1 },
      { x: 220, y: 140, label: 'Section 124 (ADA Row 12)', step: 2 },
    ],
    ticket: {
      holder: 'Alex Morgan',
      seat: 'Sec 124, Row 12, Seat 4',
      gate: 'Gate B (East Gate)',
      barcode: 'FIFA-2026-ARGFRA-99824'
    },
    sectors: [
      { name: 'North Stand', density: '32%', status: 'Normal Flow', security: 'Level 1', temp: '22°C', colorClass: 'sector-low' },
      { name: 'East Stand', density: '68%', status: 'Moderate Flow', security: 'Level 2', temp: '23°C', colorClass: 'sector-medium' },
      { name: 'South Stand', density: '89%', status: 'Heavy Congestion', security: 'Level 3', temp: '24°C', colorClass: 'sector-high' },
      { name: 'West Stand', density: '45%', status: 'Normal Flow', security: 'Level 1', temp: '21°C', colorClass: 'sector-low' }
    ],
    concessions: [
      { id: 1, name: 'Stadium Angus Burger', price: '$12.50', wait: '15 mins', calories: '650 kcal', sustainability: ['Local Source'] },
      { id: 2, name: 'Giant Bavarian Pretzel', price: '$7.00', wait: '4 mins', calories: '380 kcal', sustainability: ['Zero-Plastic', 'Plant-Based'] },
      { id: 3, name: 'Neon FIFA Souvenir Soda', price: '$8.50', wait: '2 mins', calories: '120 kcal', sustainability: ['Zero-Plastic'] },
      { id: 4, name: 'Ultimate Loaded Nachos', price: '$11.00', wait: '9 mins', calories: '540 kcal', sustainability: ['Plant-Based'] }
    ],
    wayfinding: [
      { step: 0, title: 'Gate B Entrance', desc: 'Ticket scanned at checkpoint. Queue cleared.' },
      { step: 1, title: 'Lower East Promenade', desc: 'Walk 120m towards Concession Stand #3.' },
      { step: 2, title: 'Section 124 Entrance', desc: 'Climb stairs on right to seating Row 12.' }
    ],
    accessibilityWayfinding: [
      { step: 0, title: 'Gate B ADA Entrance', desc: 'Step-free security lanes. Staff assist active.' },
      { step: 1, title: 'Elevator Lobby B', desc: 'Take Elevator 4 up to Level 1 Concourse.' },
      { step: 2, title: 'Section 124 ADA Row 12', desc: 'Ramped corridor access straight to designated wheelchair seating spaces.' }
    ],
    sustainabilityScore: {
      energyLoad: '210 kW/h',
      energyStatus: 'Medium',
      organicWaste: 38,
      recycleWaste: 47,
      landfillWaste: 15,
      carbonSaved: 12.4,
      waterRecycled: 14500
    },
    transportation: [
      { type: 'NJ Transit Rail', status: 'Running', wait: '5 mins', eco: 'Low Carbon 🌱' },
      { type: 'Eco Shuttle Bus', status: 'Running', wait: '8 mins', eco: 'Low Carbon 🌱' },
      { type: 'Rideshare Lot G', status: 'Delayed', wait: '22 mins', eco: 'High Carbon 🚗' }
    ],
    volunteerTasks: [
      { id: 101, name: 'Multilingual Help at Gate B', location: 'Gate B Entrance', crew: 'Staff Crew Alpha', priority: 'medium', status: 'Active' },
      { id: 102, name: 'Wheelchair Transfer Help', location: 'Elevator Lobby B', crew: 'Accessibility Team', priority: 'high', status: 'Pending' },
      { id: 103, name: 'Recycling Lane Check', location: 'East Concourse', crew: 'Green Volunteers', priority: 'low', status: 'Completed' }
    ]
  },
  narendra_modi: {
    id: 'narendra_modi',
    name: 'Narendra Modi Stadium',
    location: 'Ahmedabad, Gujarat',
    country: 'India',
    region: 'South Asia',
    sport: 'Cricket (IPL / ICC T20)',
    capacity: '132,000',
    currentMatch: 'India vs Australia (Final)',
    currentScan: '88.5% (116,820 Fans)',
    weather: '32°C (Humid)',
    svgRoute: [
      { x: 100, y: 50, label: 'Gate 3', step: 0 },
      { x: 160, y: 100, label: 'Ring Concourse', step: 1 },
      { x: 185, y: 185, label: 'Block J', step: 2 },
    ],
    accessibilityRoute: [
      { x: 100, y: 50, label: 'Gate 3 (ADA Ramp)', step: 0 },
      { x: 150, y: 90, label: 'North Lift Station', step: 1 },
      { x: 185, y: 185, label: 'Block J (ADA Row 5)', step: 2 },
    ],
    ticket: {
      holder: 'Alex Morgan',
      seat: 'Block J, Row 5, Seat 18',
      gate: 'Gate 3 (North-West Gate)',
      barcode: 'CRIC-IND-AUS-449102'
    },
    sectors: [
      { name: 'North Stand', density: '92%', status: 'Severe Congestion', security: 'Level 3', temp: '32°C', colorClass: 'sector-high' },
      { name: 'East Stand', density: '74%', status: 'Moderate Flow', security: 'Level 2', temp: '31°C', colorClass: 'sector-medium' },
      { name: 'South Stand', density: '41%', status: 'Normal Flow', security: 'Level 1', temp: '30°C', colorClass: 'sector-low' },
      { name: 'West Stand', density: '85%', status: 'Heavy Congestion', security: 'Level 3', temp: '31°C', colorClass: 'sector-high' }
    ],
    concessions: [
      { id: 1, name: 'Mumbai Vada Pav Duo', price: '₹180', wait: '5 mins', calories: '320 kcal', sustainability: ['Zero-Plastic', 'Plant-Based'] },
      { id: 2, name: 'Masala Chai & Samosa Combo', price: '₹150', wait: '12 mins', calories: '290 kcal', sustainability: ['Local Source', 'Plant-Based'] },
      { id: 3, name: 'Cold Pepsi Souvenir Cup', price: '₹220', wait: '2 mins', calories: '150 kcal', sustainability: ['Zero-Plastic'] },
      { id: 4, name: 'Cheese Butter Popcorn', price: '₹250', wait: '8 mins', calories: '410 kcal', sustainability: ['Plant-Based'] }
    ],
    wayfinding: [
      { step: 0, title: 'Gate 3 Turnstile', desc: 'RFID Ticket scanned at North-West entrance.' },
      { step: 1, title: 'Level 1 Ring Concourse', desc: 'Walk past Concession Stand #2 towards Gate J Corridor.' },
      { step: 2, title: 'Block J Vomitory', desc: 'Go straight through Section Entrance. Row 5 is near the boundary rope.' }
    ],
    accessibilityWayfinding: [
      { step: 0, title: 'Gate 3 Ramp Entrance', desc: 'Dedicated step-free entrance. Golf-cart shuttle available.' },
      { step: 1, title: 'North Concourse Lift', desc: 'Take Central Lift to Level 1 and use ramp-way south.' },
      { step: 2, title: 'Block J Seating Area', desc: 'Direct entry to the boundary level accessibility deck.' }
    ],
    sustainabilityScore: {
      energyLoad: '380 kW/h',
      energyStatus: 'High',
      organicWaste: 55,
      recycleWaste: 35,
      landfillWaste: 10,
      carbonSaved: 22.8,
      waterRecycled: 28000
    },
    transportation: [
      { type: 'Ahmedabad Metro', status: 'Running', wait: '3 mins', eco: 'Low Carbon 🌱' },
      { type: 'Janmarg BRTS Bus', status: 'Running', wait: '6 mins', eco: 'Low Carbon 🌱' },
      { type: 'Ola/Uber Taxi', status: 'Delayed', wait: '18 mins', eco: 'High Carbon 🚗' }
    ],
    volunteerTasks: [
      { id: 104, name: 'Hindi/English Translation Guide', location: 'Gate 3 Turnstile', crew: 'Languages Team', priority: 'medium', status: 'Active' },
      { id: 105, name: 'Water Booth Refill Assist', location: 'North Concourse', crew: 'Green Volunteers', priority: 'low', status: 'Completed' },
      { id: 106, name: 'Evacuation Route Management', location: 'West Stand', crew: 'Staff Crew Beta', priority: 'high', status: 'Pending' }
    ]
  },
  wembley: {
    id: 'wembley',
    name: 'Wembley Stadium',
    location: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    sport: 'Football (FA Cup Final)',
    capacity: '90,000',
    currentMatch: 'Chelsea vs Arsenal',
    currentScan: '58.2% (52,380 Fans)',
    weather: '16°C (Light Drizzle)',
    svgRoute: [
      { x: 55, y: 150, label: 'West Gate', step: 0 },
      { x: 130, y: 150, label: 'Concourse', step: 1 },
      { x: 175, y: 120, label: 'Level 2 Suite', step: 2 },
    ],
    accessibilityRoute: [
      { x: 55, y: 150, label: 'West Gate (ADA Portal)', step: 0 },
      { x: 110, y: 135, label: 'Lift Core West', step: 1 },
      { x: 175, y: 120, label: 'Level 2 Suite (ADA Deck)', step: 2 },
    ],
    ticket: {
      holder: 'Alex Morgan',
      seat: 'Level 2 Club, Row A, Seat 112',
      gate: 'Club Wembley Entrance (West)',
      barcode: 'WEMB-FA-CHEARS-88301'
    },
    sectors: [
      { name: 'North Stand', density: '25%', status: 'Normal Flow', security: 'Level 1', temp: '16°C', colorClass: 'sector-low' },
      { name: 'East Stand', density: '48%', status: 'Normal Flow', security: 'Level 1', temp: '16°C', colorClass: 'sector-low' },
      { name: 'South Stand', density: '79%', status: 'Heavy Congestion', security: 'Level 2', temp: '17°C', colorClass: 'sector-medium' },
      { name: 'West Stand', density: '88%', status: 'Heavy Congestion', security: 'Level 3', temp: '15°C', colorClass: 'sector-high' }
    ],
    concessions: [
      { id: 1, name: 'British Beef Pie', price: '£6.50', wait: '10 mins', calories: '480 kcal', sustainability: ['Local Source'] },
      { id: 2, name: 'Chips & Curry Sauce', price: '£4.50', wait: '6 mins', calories: '350 kcal', sustainability: ['Plant-Based'] },
      { id: 3, name: 'Official Wembley Ale', price: '£7.20', wait: '4 mins', calories: '210 kcal', sustainability: ['Zero-Plastic'] },
      { id: 4, name: 'Glazed Ring Donut Box', price: '£5.00', wait: '3 mins', calories: '320 kcal', sustainability: ['Plant-Based', 'Zero-Plastic'] }
    ],
    wayfinding: [
      { step: 0, title: 'Club Wembley West Gate', desc: 'Digital QR scanned at the hospitality turnstile.' },
      { step: 1, title: 'Bobby Moore Gallery Concourse', desc: 'Head straight past Lounge 2 towards Elevator Block D.' },
      { step: 2, title: 'Level 2 Executive Suites', desc: 'Exit elevator. Suite corridor Section 112 is on your left.' }
    ],
    accessibilityWayfinding: [
      { step: 0, title: 'West Gate Accessibility Entrance', desc: 'Security arches adapted for wheelchairs. Fast-track active.' },
      { step: 1, title: 'Elevator Core West', desc: 'Take elevator up to Level 2 Club concourse.' },
      { step: 2, title: 'Level 2 Executive Suites Deck', desc: 'Walk straight along carpeted flat surface directly to wheelchair suites.' }
    ],
    sustainabilityScore: {
      energyLoad: '180 kW/h',
      energyStatus: 'Low',
      organicWaste: 42,
      recycleWaste: 50,
      landfillWaste: 8,
      carbonSaved: 15.2,
      waterRecycled: 11000
    },
    transportation: [
      { type: 'London Underground', status: 'Running', wait: '2 mins', eco: 'Low Carbon 🌱' },
      { type: 'Wembley Rail Shuttle', status: 'Running', wait: '5 mins', eco: 'Low Carbon 🌱' },
      { type: 'London Black Cabs', status: 'Delayed', wait: '15 mins', eco: 'High Carbon 🚗' }
    ],
    volunteerTasks: [
      { id: 107, name: 'Underground Wayfinding Help', location: 'Wembley Park Station', crew: 'Staff Crew Alpha', priority: 'high', status: 'Active' },
      { id: 108, name: 'Debris & Cup Recycling sweep', location: 'Concourse level', crew: 'Green Volunteers', priority: 'medium', status: 'Pending' },
      { id: 109, name: 'Elevator Operations Assist', location: 'Lift Core West', crew: 'Accessibility Team', priority: 'low', status: 'Completed' }
    ]
  },
  melbourne_cg: {
    id: 'melbourne_cg',
    name: 'Melbourne Cricket Ground',
    location: 'Melbourne, Victoria',
    country: 'Australia',
    region: 'Oceania',
    sport: 'Cricket (The Ashes / Test Match)',
    capacity: '100,024',
    currentMatch: 'Australia vs England (Boxing Day Test)',
    currentScan: '92.1% (92,120 Fans)',
    weather: '18°C (Windy)',
    svgRoute: [
      { x: 340, y: 80, label: 'Gate 1 Checkpoint', step: 0 },
      { x: 260, y: 110, label: 'Great Southern Stand', step: 1 },
      { x: 190, y: 150, label: 'Shane Warne Stand', step: 2 },
    ],
    accessibilityRoute: [
      { x: 340, y: 80, label: 'Gate 1 (ADA Portal)', step: 0 },
      { x: 250, y: 120, label: 'South Stand Ramp', step: 1 },
      { x: 190, y: 150, label: 'Shane Warne Stand (ADA)', step: 2 },
    ],
    ticket: {
      holder: 'Alex Morgan',
      seat: 'Shane Warne Stand, Section M4, Row C, Seat 12',
      gate: 'Gate 1 Entrance (Great Southern Stand)',
      barcode: 'MCG-ASHES-AUSENG-77312'
    },
    sectors: [
      { name: 'North Stand', density: '81%', status: 'Heavy Flow', security: 'Level 2', temp: '18°C', colorClass: 'sector-high' },
      { name: 'East Stand', density: '95%', status: 'Severe Congestion', security: 'Level 3', temp: '19°C', colorClass: 'sector-high' },
      { name: 'South Stand', density: '62%', status: 'Moderate Flow', security: 'Level 2', temp: '17°C', colorClass: 'sector-medium' },
      { name: 'West Stand', density: '38%', status: 'Normal Flow', security: 'Level 1', temp: '17°C', colorClass: 'sector-low' }
    ],
    concessions: [
      { id: 1, name: "Aussie Four'N Twenty Pie", price: '$8.50', wait: '11 mins', calories: '420 kcal', sustainability: ['Local Source'] },
      { id: 2, name: 'Hot Chips Bucket', price: '$6.50', wait: '5 mins', calories: '490 kcal', sustainability: ['Plant-Based'] },
      { id: 3, name: 'Cold Victoria Bitter Ale', price: '$9.80', wait: '3 mins', calories: '160 kcal', sustainability: ['Zero-Plastic'] },
      { id: 4, name: 'Chiko Roll Snack Duo', price: '$7.50', wait: '4 mins', calories: '310 kcal', sustainability: ['Plant-Based'] }
    ],
    wayfinding: [
      { step: 0, title: 'Gate 1 Ticket Checkpoint', desc: 'Scan ticket near Jolimont station side turnstiles.' },
      { step: 1, title: 'Great Southern Stand Concourse', desc: 'Proceed clockwise past Concession Stand #1.' },
      { step: 2, title: 'Shane Warne Stand Level 1', desc: 'Enter vomitory M4. Row C seats are just inside the lower tier.' }
    ],
    accessibilityWayfinding: [
      { step: 0, title: 'Gate 1 Accessible Entry', desc: 'Step-free security arches with direct entry to concourse level.' },
      { step: 1, title: 'Shane Warne Flat Pathway', desc: 'Follow the wheelchair lane markers along the concourse.' },
      { step: 2, title: 'Shane Warne Stand M4 Deck', desc: 'Dedicated wheelchair platforms with companion seating options.' }
    ],
    sustainabilityScore: {
      energyLoad: '290 kW/h',
      energyStatus: 'Medium',
      organicWaste: 40,
      recycleWaste: 48,
      landfillWaste: 12,
      carbonSaved: 18.5,
      waterRecycled: 19000
    },
    transportation: [
      { type: 'Melbourne Metro Rail', status: 'Running', wait: '4 mins', eco: 'Low Carbon 🌱' },
      { type: 'Jolimont Tram Route 70', status: 'Running', wait: '7 mins', eco: 'Low Carbon 🌱' },
      { type: 'Rideshare Lot A', status: 'Delayed', wait: '25 mins', eco: 'High Carbon 🚗' }
    ],
    volunteerTasks: [
      { id: 110, name: 'Tram Route Traffic Assist', location: 'Jolimont Tram Exit', crew: 'Staff Crew Alpha', priority: 'medium', status: 'Active' },
      { id: 111, name: 'Concourse Waste Separation', location: 'Shane Warne Concourse', crew: 'Green Volunteers', priority: 'low', status: 'Completed' },
      { id: 112, name: 'ADA Seating Host Duty', location: 'Shane Warne Stand M4', crew: 'Accessibility Team', priority: 'high', status: 'Pending' }
    ]
  }
};
"""

    with open(stadiums_file, 'w', encoding='utf-8') as f:
        f.write(enriched_js)
        
    print("Success! Enriched stadiums.js generated successfully.")

if __name__ == "__main__":
    enrich_stadiums()
