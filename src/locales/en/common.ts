// Subset of the "common" namespace of the main FRFM app (header, footer, menu).
// The strings are copied from the live site so the replica reads the same.
const common = {
  nav: {
    home: 'Home',
    news: 'News',
    competitions: 'Competitions',
    rankings: 'Rankings',
    play: 'Play',
    clubs: 'Clubs',
    documents: 'Documents',
    shop: 'Shop',
    about: 'About',
    ariaLabel: 'Primary',
  },
  footer: {
    groups: { compete: 'Compete', play: 'Play', federation: 'Federation' },
    links: {
      calendar: 'Calendar',
      results: 'Results',
      rankings: 'Rankings',
      history: 'Tournament history',
      howToPlay: 'How to play',
      whereToPlay: 'Where to play',
      joinAClub: 'Join a club',
      coralProfile: 'Coral profile',
      aboutFrfm: 'About FRFM',
      clubs: 'Clubs',
      documents: 'Documents',
      shop: 'Shop',
      contact: 'Contact',
    },
    legal: { privacy: 'Privacy', terms: 'Terms', gdpr: 'GDPR' },
    adminSignIn: 'Admin sign in',
    tagline: 'Federația Română de Fotbal de Masă · member of ITSF. Bucharest, Romania.',
    copyright: '© {{year}} FRFM. All rights reserved.',
  },
  federationName: 'Federația Română de Fotbal de Masă',
  homeAriaLabel: 'FRFM home',
  language: { ariaLabel: 'Language', en: 'EN', ro: 'RO' },
  search: { ariaLabel: 'Search', placeholder: 'Search' },
  menu: { open: 'Open menu', close: 'Close menu' },
  notFound: {
    eyebrow: '404',
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has moved.",
    backHome: 'Back to home',
  },
}

export default common
