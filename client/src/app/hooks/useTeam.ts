import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { mockTeamMembers, type TeamMember } from '../data/mockData';

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/team')
      .then(({ data }) => setTeam(data))
      .catch(() => setTeam(mockTeamMembers))
      .finally(() => setLoading(false));
  }, []);

  return { team, loading };
}
