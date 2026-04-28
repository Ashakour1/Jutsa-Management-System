/**
 * Association roadmap on the /achievements page (edit copy here).
 * Jutsa 9 = completed. Jutsa 10 = currently in progress.
 */
export const aboutMilestones = {
  jutsa9: {
    title: " JUTSA 9 CHAPTER ",
    statusLabel: "Achieved",
    intro:
      "We completed the digital foundation for the association: fairer elections, internal operations tools, and this public website—all working together.",
    pillars: [
      {
        title: "Election system",
        description:
          "Members can follow a clearer leadership selection process from registration to results.",
        href: "/candidate-reg",
        linkText: "Candidate registration",
      },
      {
        title: "Management system",
        description:
          "Officers use one place for coordination, records, and day-to-day association work.",
        href: "/management",
        linkText: "Meet the team",
      },
      {
        title: "Association website",
        description:
          "One home for programs, team, activities, and how to get involved at Jamhuriya.",
        href: "/",
        linkText: "Home",
      },
    ],
    moreHighlights: [
      "Stronger transparency between leadership and members.",
      "Shared tools so portfolios stay aligned on plans and timelines.",
      "A single trusted place for news, FAQs, and contact.",
    ],
  },
  jutsa10: {
    title: "Jutsa 10",
    statusLabel: "Currently working",
    intro:
      "We are now building on that base: deeper member programs, richer content, and tighter feedback loops across campus.",
    inProgress: [
      {
        title: "Deeper platform features",
        description:
          "Extending the election and management experience based on officer and member feedback.",
      },
      {
        title: "Programs & partnerships",
        description:
          "Growing workshops, faculty-day alignment, and external collaborations.",
      },
      {
        title: "Content & community",
        description:
          "More stories, resources, and ways for students to take part beyond elections.",
      },
    ],
  },
};
