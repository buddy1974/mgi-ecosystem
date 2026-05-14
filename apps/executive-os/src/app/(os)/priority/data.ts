export type Priority = {
  id: string;
  title: string;
  description: string;
  entity: string; // "MGI" | "Rogers" | "Horeb" | "NMI" | "LQ" | "DROS" | "Drimp" | "Abba Land"
  deadline?: string; // ISO date string or human label like "This week"
  status: "active" | "pending" | "watching";
  urgent: boolean;
};

export type Decision = {
  id: string;
  title: string;
  entity: string;
  context: string;
  optionsCount: number;
  daysOpen: number;
};

export const mockPriorities: Priority[] = [
  {
    id: "p1",
    title: "Activate Executive OS live database",
    description:
      "Initialize Neon PostgreSQL and connect auth flow. Blocks all real data modules.",
    entity: "MGI",
    deadline: "This month",
    status: "active",
    urgent: true,
  },
  {
    id: "p2",
    title: "NMI Education website cutover",
    description:
      "Migrate real content from nmieducation.com to new Vercel build. Domain pointing awaits.",
    entity: "NMI",
    deadline: "Next 2 weeks",
    status: "active",
    urgent: false,
  },
  {
    id: "p3",
    title: "Dominion Life Men's Conference — registration open",
    description:
      "Confirm registration form live and tested before promotion begins.",
    entity: "Rogers",
    deadline: "This week",
    status: "watching",
    urgent: false,
  },
];

export const mockDecisions: Decision[] = [
  {
    id: "d1",
    title: "Drimp Foundation domain cutover timing",
    entity: "Drimp",
    context:
      "Current drimpfoundation.org is live and rich. New build needs content migration before pointing.",
    optionsCount: 2,
    daysOpen: 3,
  },
  {
    id: "d2",
    title: "ANTHROPIC_API_KEY activation for AI Chat Widget",
    entity: "MGI",
    context:
      "Widget is built and deployed. Needs env var in Vercel to go live on mgi-ventures.com.",
    optionsCount: 1,
    daysOpen: 1,
  },
];
