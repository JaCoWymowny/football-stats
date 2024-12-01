import { ReactNode } from 'react';

export interface AuthData {
  username: string;
  password: string;
  email?: string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export type AuthGuardProps = {
  redirectPath?: string;
  children?: ReactNode;
};

export interface MatchesResponse {
  filters: {
    dateFrom: string;
    dateTo: string;
    permission: string;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
    played: number;
  };
  matches: Match[];
}

export interface Match {
  id: number;
  utcDate: string;
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: {
    name: string;
  };
}
