/* ==========================================================================
   Site configuration (edit in one place)
   Keep this file tiny and dependency-free.
   ========================================================================== */

window.SITE = {
  personName: "Nguyen Van Phuong",

  // Canonical base URL for SEO (update in README)
  // - For user site:  https://YOUR_USERNAME.github.io
  // - For project site: https://YOUR_USERNAME.github.io/YOUR_REPO
  canonicalBase: "https://phuongnvp.github.io/phuongnvp.github.io",

  // External profiles (placeholders)
  links: {
    scholar: "https://scholar.google.com/citations?user=5n6GxWoAAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0002-1915-0565",
    github: "https://github.com/phuongnvp",
    linkedin: "https://www.linkedin.com/in/phuongnvp1011/",
  },

  // Contact
  contact: {
    email: "phuongnv@hup.edu.vn",
    affiliation: "Department of Pharmaceutical Sciences, University of Vienna",
  },

  // Theme
  theme: {
    // If true: show toggle *if* a toggle element exists on the page.
    // (We keep it optional to avoid clutter.)
    enableThemeToggle: true,

    // default: "light" | "dark" | "system"
    defaultMode: "system",

    // localStorage key
    storageKey: "site-theme",
  },
};
