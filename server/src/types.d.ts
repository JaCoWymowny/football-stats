declare global {
  namespace Express {
    // Dokładny kształt użytkownika, którego masz w req.user
    interface User {
      id: number;
      username: string;
      email: string;
      role: string;
      password: string; // masz do niego dostęp w update password
    }
    interface Request {
      user: User; // bez undefined – middleware musi gwarantować
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
