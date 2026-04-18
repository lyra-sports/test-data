import { describe, it, expect } from 'vitest';
import { createDataFileContent } from './generators';

describe('createDataFileContent', () => {
  it('returns an object with the required top-level keys', () => {
    const result = createDataFileContent(30);
    expect(result).toHaveProperty('$schema');
    expect(result).toHaveProperty('AgeGroups');
    expect(result).toHaveProperty('EventDefinitions');
    expect(result).toHaveProperty('Subcompetitions');
    expect(result).toHaveProperty('Competition');
  });

  it('$schema is a non-empty string', () => {
    const { $schema } = createDataFileContent(30);
    expect(typeof $schema).toBe('string');
    expect($schema.length).toBeGreaterThan(0);
  });

  it('AgeGroups is a non-empty array', () => {
    const { AgeGroups } = createDataFileContent(30);
    expect(Array.isArray(AgeGroups)).toBe(true);
    expect(AgeGroups.length).toBeGreaterThan(0);
  });

  it('EventDefinitions is a non-empty array', () => {
    const { EventDefinitions } = createDataFileContent(30);
    expect(Array.isArray(EventDefinitions)).toBe(true);
    expect(EventDefinitions.length).toBeGreaterThan(0);
  });

  it('Competition has the expected shape', () => {
    const { Competition } = createDataFileContent(30);
    expect(Competition).toHaveProperty('Key');
    expect(Competition).toHaveProperty('CompetitionName');
    expect(Competition).toHaveProperty('Teams');
    expect(Competition).toHaveProperty('Events');
    expect(Array.isArray(Competition.Teams)).toBe(true);
    expect(Array.isArray(Competition.Events)).toBe(true);
  });

  it('generates at least one team', () => {
    const { Competition } = createDataFileContent(30);
    expect(Competition.Teams.length).toBeGreaterThanOrEqual(1);
  });

  it('each team has a non-empty list of participants', () => {
    const { Competition } = createDataFileContent(30);
    for (const team of Competition.Teams) {
      expect(Array.isArray(team.Participants)).toBe(true);
      expect(team.Participants.length).toBeGreaterThan(0);
    }
  });

  it('generates at least one event', () => {
    const { Competition } = createDataFileContent(30);
    expect(Competition.Events.length).toBeGreaterThanOrEqual(1);
  });
});
