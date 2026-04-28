/** Former leadership roster (prior to the current management team). Images are served from /public. */

export function legacyImageSrc(path) {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export const formerLeadership = [
  {
    name: "Hassan Abdikarim Eymoy",
    role: "President",
    description:
      "Leading our initiatives and representing student interests.",
    image: "/president.jpg",
    facebook: "https://www.facebook.com/aim.king.395",
    linkedIn: "https://www.linkedin.com/in/hassan-akariim-1ab7972ba/",
    website: "#",
  },
  {
    name: "Hafsa Mohamed Abdi",
    role: "Vice President",
    description: "Supporting the president and managing events.",
    image: "/vp.jpg",
    facebook: "#",
    linkedIn: "#",
    website: "#",
  },
  {
    name: "Abdishakur Mohamed",
    role: "Chief Development Officer",
    description:
      "Visionary driving innovation and strategic growth initiatives.",
    image: "/cdo2.jpg",
    facebook: "https://www.facebook.com/",
    linkedIn: "https://www.linkedin.com/in/a-shakour-mohammed-90836725a/",
    website: "https://abdishakour.com/",
  },
  {
    name: "Naima Abdirahiim Wehliye",
    role: "Operation Officer",
    description: "Streamlining operations for efficiency and excellence.",
    image: "/hop.jpeg",
    facebook: "#",
    linkedIn: "#",
    website: "#",
  },
  {
    name: "Mohamed Nur Mumin",
    role: "Finance Officer",
    description: "Managing financial strategy and growth.",
    image: "/hof.jpg",
    facebook: "#",
    linkedIn: "#",
    website: "#",
  },
];
