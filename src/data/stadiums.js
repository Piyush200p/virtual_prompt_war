export const STADIUM_CONFIGS = {
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
    // SVG route: coordinates through the 400x300 viewBox matching stadium sectors
    // Step 0 = Gate entrance (east side), Step 1 = Concourse promenade, Step 2 = Seating section
    svgRoute: [
      { x: 340, y: 150, label: 'Gate B', step: 0 },
      { x: 290, y: 150, label: 'East Promenade', step: 1 },
      { x: 220, y: 140, label: 'Section 124', step: 2 },
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
      { id: 1, name: 'Stadium Angus Burger', price: '$12.50', wait: '15 mins', calories: '650 kcal' },
      { id: 2, name: 'Giant Bavarian Pretzel', price: '$7.00', wait: '4 mins', calories: '380 kcal' },
      { id: 3, name: 'Neon FIFA Souvenir Soda', price: '$8.50', wait: '2 mins', calories: '120 kcal' },
      { id: 4, name: 'Ultimate Loaded Nachos', price: '$11.00', wait: '9 mins', calories: '540 kcal' }
    ],
    wayfinding: [
      { step: 0, title: 'Gate B Entrance', desc: 'Ticket scanned at checkpoint. Queue cleared.' },
      { step: 1, title: 'Lower East Promenade', desc: 'Walk 120m towards Concession Stand #3.' },
      { step: 2, title: 'Section 124 Entrance', desc: 'Climb stairs on right to seating Row 12.' }
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
    // Oval cricket stadium — enters from North-West (top-left), sweeps to Block J near south boundary
    svgRoute: [
      { x: 100, y: 50, label: 'Gate 3', step: 0 },
      { x: 160, y: 100, label: 'Ring Concourse', step: 1 },
      { x: 185, y: 185, label: 'Block J', step: 2 },
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
      { id: 1, name: 'Mumbai Vada Pav Duo', price: '₹180', wait: '5 mins', calories: '320 kcal' },
      { id: 2, name: 'Masala Chai & Samosa Combo', price: '₹150', wait: '12 mins', calories: '290 kcal' },
      { id: 3, name: 'Cold Pepsi Souvenir Cup', price: '₹220', wait: '2 mins', calories: '150 kcal' },
      { id: 4, name: 'Cheese Butter Popcorn', price: '₹250', wait: '8 mins', calories: '410 kcal' }
    ],
    wayfinding: [
      { step: 0, title: 'Gate 3 Turnstile', desc: 'RFID Ticket scanned at North-West entrance.' },
      { step: 1, title: 'Level 1 Ring Concourse', desc: 'Walk past Concession Stand #2 towards Gate J Corridor.' },
      { step: 2, title: 'Block J Vomitory', desc: 'Go straight through Section Entrance. Row 5 is near the boundary rope.' }
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
    // Rectangular stadium — enters from West (left), walks through concourse corridor, up to Level 2 Club
    svgRoute: [
      { x: 55, y: 150, label: 'West Gate', step: 0 },
      { x: 130, y: 150, label: 'Concourse', step: 1 },
      { x: 175, y: 120, label: 'Level 2 Suite', step: 2 },
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
      { id: 1, name: 'British Beef Pie', price: '£6.50', wait: '10 mins', calories: '480 kcal' },
      { id: 2, name: 'Chips & Curry Sauce', price: '£4.50', wait: '6 mins', calories: '350 kcal' },
      { id: 3, name: 'Official Wembley Ale', price: '£7.20', wait: '4 mins', calories: '210 kcal' },
      { id: 4, name: 'Glazed Ring Donut Box', price: '£5.00', wait: '3 mins', calories: '320 kcal' }
    ],
    wayfinding: [
      { step: 0, title: 'Club Wembley West Gate', desc: 'Digital QR scanned at the hospitality turnstile.' },
      { step: 1, title: 'Bobby Moore Gallery Concourse', desc: 'Head straight past Lounge 2 towards Elevator Block D.' },
      { step: 2, title: 'Level 2 Executive Suites', desc: 'Exit elevator. Suite corridor Section 112 is on your left.' }
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
      { id: 1, name: 'Aussie Four\'N Twenty Pie', price: '$8.50', wait: '11 mins', calories: '420 kcal' },
      { id: 2, name: 'Hot Chips Bucket', price: '$6.50', wait: '5 mins', calories: '490 kcal' },
      { id: 3, name: 'Cold Victoria Bitter Ale', price: '$9.80', wait: '3 mins', calories: '160 kcal' },
      { id: 4, name: 'Chiko Roll Snack Duo', price: '$7.50', wait: '4 mins', calories: '310 kcal' }
    ],
    wayfinding: [
      { step: 0, title: 'Gate 1 Ticket Checkpoint', desc: 'Scan ticket near Jolimont station side turnstiles.' },
      { step: 1, title: 'Great Southern Stand Concourse', desc: 'Proceed clockwise past Concession Stand #1.' },
      { step: 2, title: 'Shane Warne Stand Level 1', desc: 'Enter vomitory M4. Row C seats are just inside the lower tier.' }
    ]
  }
};
