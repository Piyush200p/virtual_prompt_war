import test from 'node:test';
import assert from 'node:assert';
import { STADIUM_CONFIGS } from '../src/data/stadiums.js';

test('Stadium Configs Integrity', () => {
  assert.ok(STADIUM_CONFIGS, 'STADIUM_CONFIGS should be defined');
  assert.ok(STADIUM_CONFIGS.metlife, 'MetLife should be defined');
  assert.ok(STADIUM_CONFIGS.azteca, 'Azteca should be defined');
  assert.ok(STADIUM_CONFIGS.bc_place, 'BC Place should be defined');
});

test('Stadium Configs Required Fields', () => {
  for (const [key, config] of Object.entries(STADIUM_CONFIGS)) {
    assert.strictEqual(config.id, key, `ID should match key ${key}`);
    assert.ok(config.name, `Name should be defined for ${key}`);
    assert.ok(Array.isArray(config.sectors), `Sectors should be an array for ${key}`);
    assert.ok(config.ticket, `Ticket details should be defined for ${key}`);
    assert.ok(Array.isArray(config.accessibilityRoute), `accessibilityRoute should be an array for ${key}`);
    assert.ok(Array.isArray(config.accessibilityWayfinding), `accessibilityWayfinding should be an array for ${key}`);
    assert.ok(Array.isArray(config.transportation), `transportation should be an array for ${key}`);
    assert.ok(Array.isArray(config.volunteerTasks), `volunteerTasks should be an array for ${key}`);
  }
});
