/**
 * Central permission identifiers (stored in Permission.name).
 */

export const P = {
  USERS_READ: "users.read",
  USERS_WRITE: "users.write",
  USERS_DELETE: "users.delete",

  FINANCE_READ: "finance.read",
  FINANCE_WRITE: "finance.write",

  MEMBERS_READ: "members.read",
  MEMBERS_WRITE: "members.write",

  POSITIONS_READ: "positions.read",
  POSITIONS_WRITE: "positions.write",

  COMPETITORS_READ: "competitors.read",
  COMPETITORS_WRITE: "competitors.write",

  SPORTS_READ: "sports.read",
  SPORTS_WRITE: "sports.write",

  ACTIVITIES_READ: "activities.read",
  ACTIVITIES_WRITE: "activities.write",

  CAAWIYE_READ: "caawiye.read",
  CAAWIYE_WRITE: "caawiye.write",

  CANDIDATES_READ: "candidates.read",
  CANDIDATES_WRITE: "candidates.write",

  FORMS_READ: "forms.read",
  FORMS_WRITE: "forms.write",
};

export const ALL_PERMISSIONS = Object.values(P);
