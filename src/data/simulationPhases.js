export const SIM_PHASES = {
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

export const SIM_SECONDARY_METRICS = {
  gates_open: {
    scanRate: { value: '12.4%', trend: '+12.4% stream-in progress', status: 'up' },
    securityWait: { value: '2.8m', trend: 'Fastest at South Gate C', status: 'down' },
    concessions: { value: 'Low', trend: 'Avg queue: 3.1 minutes', status: 'down' }
  },
  match_starting: {
    scanRate: { value: '48.2%', trend: 'Surging +28.5% scan rate', status: 'up' },
    securityWait: { value: '18.5m', trend: 'Surging at West Gate D', status: 'up' },
    concessions: { value: 'High', trend: 'Avg queue: 12.0 minutes', status: 'up' }
  },
  match_live: {
    scanRate: { value: '96.1%', trend: 'All seats occupied', status: 'up' },
    securityWait: { value: '1.2m', trend: 'Gates secured', status: 'down' },
    concessions: { value: 'Moderate', trend: 'Avg queue: 4.5 minutes', status: 'down' }
  },
  half_time: {
    scanRate: { value: '96.8%', trend: 'Halftime exit scans stable', status: 'up' },
    securityWait: { value: '0.8m', trend: 'Gates secured', status: 'down' },
    concessions: { value: 'Critical', trend: 'Avg queue: 19.8 minutes (Halftime rush)', status: 'up' }
  },
  crowd_exiting: {
    scanRate: { value: '99.9%', trend: 'Event completed', status: 'down' },
    securityWait: { value: '0.0m', trend: 'Gates open for egress', status: 'down' },
    concessions: { value: 'Closed', trend: 'Avg queue: 0.0 minutes', status: 'down' }
  }
};
