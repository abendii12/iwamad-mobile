export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number };

export const events: CampusEvent[] = [
  { id: 1, title: "Figma to React workshop", date: "2026-11-05", place: "Room 214", seats: 25 },
  { id: 2, title: "Hackathon kickoff", date: "2026-11-12", place: "Main hall", seats: 60 },
  { id: 3, title: "Mock interview: frontend", date: "2026-11-14", place: "Room 105", seats: 3 },
  { id: 4, title: "Tea and code evening", date: "2026-11-20", place: "Library, 2nd floor", seats: 15 },
];