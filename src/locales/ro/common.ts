import type en from '../en/common'

// Subset of the "common" namespace of the main FRFM app (header, footer, menu).
// The strings are copied from the live site so the replica reads the same.
const common: typeof en = {
  nav: {
    home: 'Acasă',
    news: 'Știri',
    competitions: 'Competiții',
    rankings: 'Clasamente',
    play: 'Joacă',
    clubs: 'Cluburi',
    documents: 'Documente',
    shop: 'Magazin',
    about: 'Despre',
    ariaLabel: 'Meniu principal',
  },
  footer: {
    groups: { compete: 'Competiții', play: 'Joacă', federation: 'Federație' },
    links: {
      calendar: 'Calendar',
      results: 'Rezultate',
      rankings: 'Clasamente',
      history: 'Istoric turnee',
      howToPlay: 'Cum se joacă',
      whereToPlay: 'Unde poți juca',
      joinAClub: 'Alătură-te unui club',
      coralProfile: 'Profil Coral',
      aboutFrfm: 'Despre FRFM',
      clubs: 'Cluburi',
      documents: 'Documente',
      shop: 'Magazin',
      contact: 'Contact',
    },
    legal: { privacy: 'Confidențialitate', terms: 'Termeni', gdpr: 'GDPR' },
    adminSignIn: 'Autentificare admin',
    tagline: 'Federația Română de Fotbal de Masă · membră ITSF. București, România.',
    copyright: '© {{year}} FRFM. Toate drepturile rezervate.',
  },
  federationName: 'Federația Română de Fotbal de Masă',
  homeAriaLabel: 'FRFM acasă',
  language: { ariaLabel: 'Limbă', en: 'EN', ro: 'RO' },
  search: { ariaLabel: 'Caută', placeholder: 'Caută' },
  menu: { open: 'Deschide meniul', close: 'Închide meniul' },
  notFound: {
    eyebrow: '404',
    title: 'Pagina nu a fost găsită',
    description: 'Pagina pe care o cauți nu există sau a fost mutată.',
    backHome: 'Înapoi la pagina principală',
  },
}

export default common
