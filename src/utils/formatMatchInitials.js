// Format Match Teams to Initials with hover full-names

// Module scope: built once, not re-allocated on every call.
const TEAM_INITIALS = {
  Argentina: 'ARG',
  France: 'FRA',
  India: 'IND',
  Australia: 'AUS',
  Chelsea: 'CHE',
  Arsenal: 'ARS',
  Spain: 'ESP',
  England: 'ENG',
  Portugal: 'POR',
  Croatia: 'CRO',
};

const getInitials = (name) => {
  if (TEAM_INITIALS[name]) return TEAM_INITIALS[name];
  if (name.length <= 3) return name.toUpperCase();
  return name.substring(0, 3).toUpperCase();
};

// Ordered so "quarter-final"/"semi-final" are matched before the generic
// "final" pattern, since both contain the substring "final".
const STAGE_ABBREVIATIONS = [
  [/quarter-final\s*(\d+)/i, 'QF$1'],
  [/quarter-final/i, 'QF'],
  [/semi-final\s*(\d+)/i, 'SF$1'],
  [/semi-final/i, 'SF'],
  [/final/i, 'F'],
];

const abbreviateStage = (stage) => {
  for (const [pattern, replacement] of STAGE_ABBREVIATIONS) {
    if (pattern.test(stage)) return stage.replace(pattern, replacement);
  }
  return stage;
};

const VS_REGEX = /\s+vs\.?\s+/i;

export const formatMatchInitials = (matchStr) => {
  if (!matchStr) return '';
  if (!VS_REGEX.test(matchStr)) return matchStr;

  const [rawTeam1, rawTeam2] = matchStr.split(VS_REGEX);
  const team1 = rawTeam1.trim();
  let team2 = rawTeam2.trim();

  let stage = '';
  const bracketIndex = team2.indexOf('(');
  if (bracketIndex !== -1) {
    stage = team2.substring(bracketIndex).trim();
    team2 = team2.substring(0, bracketIndex).trim();
  }

  stage = abbreviateStage(stage);

  return `${getInitials(team1)} vs ${getInitials(team2)} ${stage}`;
};
