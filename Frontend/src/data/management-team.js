/** Public assets live in /public/team — use teamImageUrl for filenames with spaces/special chars. */

export function teamImageUrl(filename) {
  return `/team/${encodeURIComponent(filename)}`;
}

/** Order matches Frontend/public/team/Names.txt; Abdisalam added from portrait filename. */
export const managementTeam = [
  {
    name: "Mohamed Nor Mumin",
    role: "Gudomiye (Chairperson)",
    imageFile: "Mohamed Nur Mumin.jpeg",
    description:
      "Leading JUTSA's direction and representing the association.",
  },
  {
    name: "Abdifitah Omar Adam",
    role: "Head of Media & Multimedia",
    imageFile: "Abdifitah head of Media & multimedia.jpeg",
    description:
      "Overseeing communications, media coverage, and multimedia content.",
  },
  {
    name: "Said Abdirahman Said",
    role: "Head of Education",
    imageFile: "Said head of education.jpeg",
    description: "Driving learning initiatives and academic-focused programs.",
  },
  {
    name: "Ubah Mohamud Mohamed",
    role: "Head of Planning",
    imageFile: "Upah head of Planing.jpeg",
    description:
      "Coordinating plans, timelines, and strategic project alignment.",
  },
  {
    name: "Sarah Mohamed Hussein",
    role: "Head of Finance",
    imageFile: "Sarah Head of Finance.jpeg",
    description: "Managing budgets, accountability, and financial reporting.",
  },
  {
    name: "Ahmed Abdirahman Dhaqane",
    role: "Sports",
    imageFile: "Ahmed Sports.jpeg",
    description: "Leading sports programs, tournaments, and athlete engagement.",
  },
  {
    name: "Ascad Abdi Muncim",
    role: "Consultant",
    imageFile: "Ascad Consultant.jpeg",
    description: "Providing advisory support on strategy and governance.",
  },
  {
    name: "Abdinasir Mohamed Abukar",
    role: "Head of External Affairs",
    imageFile: "Abdinasir External Affairs.jpeg",
    description: "Managing partnerships and external stakeholder relations.",
  },
  {
    name: "Adam Ibrahim Adam",
    role: "Secretary",
    imageFile: "Adan Secratory.jpeg",
    description:
      "Handling documentation, correspondence, and meeting coordination.",
  },
  {
    name: "Abdisalam",
    role: "Ku Xigeen Sports (Deputy Sports)",
    imageFile: "Abdisalam Ku Xigeen Sports.jpeg",
    description:
      "Supporting the sports portfolio and deputy leadership for athletics.",
  },
];
