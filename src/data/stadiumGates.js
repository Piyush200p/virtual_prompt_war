export const STADIUM_GATES = [
  { id: 'gate_a', label: 'Gate A', position: 'North', svgX: 200, svgY: 18, queueWait: '3 min', status: 'Open', turnstiles: 12, throughput: '420/hr', ada: true, securityLevel: 'Standard', note: 'Main VIP & media entrance. Fast-track lanes available.' },
  { id: 'gate_b', label: 'Gate B', position: 'East', svgX: 375, svgY: 150, queueWait: '8 min', status: 'Congested', turnstiles: 16, throughput: '680/hr', ada: true, securityLevel: 'Enhanced', note: 'Primary fan entry. Highest throughput gate. Digital wallet scanners active.' },
  { id: 'gate_c', label: 'Gate C', position: 'South', svgX: 200, svgY: 282, queueWait: '5 min', status: 'Open', turnstiles: 10, throughput: '350/hr', ada: false, securityLevel: 'Standard', note: 'Family & accessibility zone. Closest to parking lots P3-P5.' },
  { id: 'gate_d', label: 'Gate D', position: 'West', svgX: 25, svgY: 150, queueWait: '2 min', status: 'Open', turnstiles: 8, throughput: '280/hr', ada: true, securityLevel: 'Standard', note: 'Staff & volunteer staging entrance. Lowest congestion.' },
];
