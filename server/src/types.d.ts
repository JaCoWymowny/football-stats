declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      email: string;
      role: string;
      password: string;
    }
    interface Request {
      user: User;
    }
  }

  namespace API {
    interface Match {
      id: number;
      utcDate: string;
      status: string;
      homeTeam: { id: number; name: string };
      awayTeam: { id: number; name: string };
      score: { fullTime: { home: number | null; away: number | null } };
    }
    interface MatchResponse {
      matches: Match[];
    }
  }
}

export {};
