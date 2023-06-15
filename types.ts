export type Club = {
  id: string;
  name: string;
  teams: Team[];
  sport: Sport;
};

export type Competition = {
  id: string;
  name: string;
  sport: Sport;
  teams: Team[];
  categories: Categorie;
  categorie: Categorie;
};

export type Team = {
  id: string;
  name: string;
  club: Club;
  categorie: Categorie;
  competition: Competition;
  sport: Sport;
};

export type Categorie = {
  id: string;
  name: string;
  teams: Team[];
  sport: Sport;
};

export type Sport = {
  id: string;
  name: string;
  clubs: Club[];
  categories: Categorie[];
  teams: Team[];
  competitions: Competition[];
  club: Club[]
  team: Team[]
};

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  club: Club[];
  accessToken: string;
  refreshToken: string;
};

export type SignIn = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  club: Club[];
  accessToken: string;
};
