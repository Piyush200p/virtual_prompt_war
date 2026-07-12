export const STADIUM_CONFIGS = {
  metlife: {
    id: 'metlife',
    name: 'MetLife Stadium',
    location: 'East Rutherford, NJ',
    country: 'USA',
    region: 'North America',
    role: 'Finals Venue',
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
  azteca: {
    id: 'azteca',
    name: 'Estadio Azteca',
    location: 'Mexico City',
    country: 'Mexico',
    region: 'North America',
    role: 'Opening Venue',
    capacity: '87,523',
    currentMatch: 'Mexico vs Ecuador (Opening Match)',
    currentScan: '91.2% (79,820 Fans)',
    weather: '19°C (Clear)',
    svgRoute: [
      { x: 55, y: 150, label: 'Gate 1', step: 0 },
      { x: 130, y: 150, label: 'West Promenade', step: 1 },
      { x: 175, y: 120, label: 'Section 105', step: 2 },
    ],
    accessibilityRoute: [
      { x: 55, y: 150, label: 'Gate 1 (ADA Check)', step: 0 },
      { x: 110, y: 135, label: 'Elevator Lobby West', step: 1 },
      { x: 175, y: 120, label: 'Section 105 (ADA Row 6)', step: 2 },
    ],
    ticket: {
      holder: 'Alex Morgan',
      seat: 'Sec 105, Row 6, Seat 18',
      gate: 'Gate 1 (West Access)',
      barcode: 'FIFA-2026-MEXECU-11029'
    },
    sectors: [
      { name: 'North Stand', density: '81%', status: 'Heavy Flow', security: 'Level 2', temp: '18°C', colorClass: 'sector-high' },
      { name: 'East Stand', density: '95%', status: 'Severe Congestion', security: 'Level 3', temp: '19°C', colorClass: 'sector-high' },
      { name: 'South Stand', density: '62%', status: 'Moderate Flow', security: 'Level 2', temp: '17°C', colorClass: 'sector-medium' },
      { name: 'West Stand', density: '38%', status: 'Normal Flow', security: 'Level 1', temp: '17°C', colorClass: 'sector-low' }
    ],
    concessions: [
      { id: 1, name: 'Tacos al Pastor (3 pieces)', price: '$6.00', wait: '11 mins', calories: '420 kcal', sustainability: ['Local Source'] },
      { id: 2, name: 'Churros & Hot Chocolate', price: '$4.00', wait: '5 mins', calories: '350 kcal', sustainability: ['Zero-Plastic', 'Plant-Based'] },
      { id: 3, name: 'Neon FIFA Souvenir Soda', price: '$8.50', wait: '2 mins', calories: '120 kcal', sustainability: ['Zero-Plastic'] },
      { id: 4, name: 'Ultimate Loaded Nachos', price: '$11.00', wait: '9 mins', calories: '540 kcal', sustainability: ['Plant-Based'] }
    ],
    wayfinding: [
      { step: 0, title: 'Gate 1 West Entrance', desc: 'Scan digital barcode at main access turnstiles.' },
      { step: 1, title: 'Lower West Promenade', desc: 'Walk past Concession Stand #2 towards Section 105 corridor.' },
      { step: 2, title: 'Section 105 Tunnel', desc: 'Proceed through the vomitory entry. Seating row 6 is on your left.' }
    ],
    accessibilityWayfinding: [
      { step: 0, title: 'Gate 1 Accessible Entry', desc: 'Dedicated step-free entry lane with wheelchair accessibility.' },
      { step: 1, title: 'Elevator Lobby West', desc: 'Take elevator up to the lower stand corridor.' },
      { step: 2, title: 'Section 105 ADA Row 6', desc: 'Direct entry to designated wheelchair-accessible seating platform.' }
    ],
    sustainabilityScore: {
      energyLoad: '280 kW/h',
      energyStatus: 'Medium',
      organicWaste: 40,
      recycleWaste: 48,
      landfillWaste: 12,
      carbonSaved: 18.5,
      waterRecycled: 19000
    },
    transportation: [
      { type: 'Mexico City Metro L2', status: 'Running', wait: '4 mins', eco: 'Low Carbon 🌱' },
      { type: 'Eco Shuttle Bus', status: 'Running', wait: '7 mins', eco: 'Low Carbon 🌱' },
      { type: 'Rideshare Lot A', status: 'Delayed', wait: '25 mins', eco: 'High Carbon 🚗' }
    ],
    volunteerTasks: [
      { id: 104, name: 'Spanish/English Translation Guide', location: 'Gate 1 Entrance', crew: 'Languages Team', priority: 'medium', status: 'Active' },
      { id: 105, name: 'Concourse Waste Sweep', location: 'West Promenade', crew: 'Green Volunteers', priority: 'low', status: 'Completed' },
      { id: 106, name: 'ADA Seating Host Assist', location: 'Section 105 ADA Platform', crew: 'Accessibility Team', priority: 'high', status: 'Pending' }
    ]
  },
  bc_place: {
    id: 'bc_place',
    name: 'BC Place',
    location: 'Vancouver, BC',
    country: 'Canada',
    region: 'North America',
    role: 'Group Stage',
    capacity: '54,500',
    currentMatch: 'Canada vs Colombia (Group B)',
    currentScan: '62.4% (34,008 Fans)',
    weather: '15°C (Rainy - Roof Closed)',
    svgRoute: [
      { x: 55, y: 150, label: 'Gate H', step: 0 },
      { x: 130, y: 150, label: 'North Promenade', step: 1 },
      { x: 175, y: 120, label: 'Section 214', step: 2 },
    ],
    accessibilityRoute: [
      { x: 55, y: 150, label: 'Gate H (ADA Portal)', step: 0 },
      { x: 110, y: 135, label: 'Lift Core North', step: 1 },
      { x: 175, y: 120, label: 'Section 214 (ADA Row 15)', step: 2 },
    ],
    ticket: {
      holder: 'Alex Morgan',
      seat: 'Sec 214, Row 15, Seat 8',
      gate: 'Gate H (North Entrance)',
      barcode: 'FIFA-2026-CANCOL-55910'
    },
    sectors: [
      { name: 'North Stand', density: '25%', status: 'Normal Flow', security: 'Level 1', temp: '16°C', colorClass: 'sector-low' },
      { name: 'East Stand', density: '48%', status: 'Normal Flow', security: 'Level 1', temp: '16°C', colorClass: 'sector-low' },
      { name: 'South Stand', density: '79%', status: 'Heavy Congestion', security: 'Level 2', temp: '17°C', colorClass: 'sector-medium' },
      { name: 'West Stand', density: '88%', status: 'Heavy Congestion', security: 'Level 3', temp: '15°C', colorClass: 'sector-high' }
    ],
    concessions: [
      { id: 1, name: 'Classic Poutine', price: '$9.50', wait: '10 mins', calories: '480 kcal', sustainability: ['Local Source'] },
      { id: 2, name: 'Maple Glazed Pretzel', price: '$7.50', wait: '6 mins', calories: '350 kcal', sustainability: ['Plant-Based'] },
      { id: 3, name: 'Neon FIFA Souvenir Soda', price: '$8.50', wait: '2 mins', calories: '120 kcal', sustainability: ['Zero-Plastic'] },
      { id: 4, name: 'Ultimate Loaded Nachos', price: '$11.00', wait: '9 mins', calories: '540 kcal', sustainability: ['Plant-Based'] }
    ],
    wayfinding: [
      { step: 0, title: 'Gate H North Entrance', desc: 'Scan ticket barcode at the stadium main plaza gates.' },
      { step: 1, title: 'Bobby Moore Concourse', desc: 'Walk past Concession Stand #1 towards Lift Core North corridor.' },
      { step: 2, title: 'Section 214 vomitory', desc: 'Exit corridor and enter seating area. Row 15 is in the middle tier.' }
    ],
    accessibilityWayfinding: [
      { step: 0, title: 'Gate H Accessibility Entry', desc: 'Step-free security lanes with direct access to central elevator lift lobby.' },
      { step: 1, title: 'Lift Core North', desc: 'Take elevator up to the Level 2 concourse.' },
      { step: 2, title: 'Section 214 ADA Row 15', desc: 'Designated flat surface wheelchair platform with direct field view.' }
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
      { type: 'Skytrain Expo Line', status: 'Running', wait: '2 mins', eco: 'Low Carbon 🌱' },
      { type: 'Eco Shuttle Bus', status: 'Running', wait: '5 mins', eco: 'Low Carbon 🌱' },
      { type: 'Rideshare Lot C', status: 'Delayed', wait: '15 mins', eco: 'High Carbon 🚗' }
    ],
    volunteerTasks: [
      { id: 107, name: 'Skytrain Direction Assist', location: 'Stadium-Chinatown Station', crew: 'Staff Crew Alpha', priority: 'high', status: 'Active' },
      { id: 108, name: 'Cup Recycling separation sweep', location: 'Level 2 Concourse', crew: 'Green Volunteers', priority: 'medium', status: 'Pending' },
      { id: 109, name: 'Elevator Access Helper', location: 'Lift Core North', crew: 'Accessibility Team', priority: 'low', status: 'Completed' }
    ]
  }
};
