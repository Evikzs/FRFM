// "corporate" namespace: the Corporate Series page.
// EDIT WHEN LIVE: facts.dateValue, facts.venueValue and faq item "when".
const corporate = {
  meta: { title: 'Corporate Series' },
  eyebrow: 'Corporate Series · First edition',
  title: 'Bring your team to the table',
  intro:
    'A table football series for companies. Register your company, bring your colleagues and play against teams from other companies. No experience needed.',
  cta: { register: 'Register your company', how: 'How it works' },
  sectionNav: {
    label: 'In this section',
    event: 'The event',
    who: 'Who can join',
    how: 'How to join',
    faq: 'Questions',
    register: 'Register',
  },
  event: {
    heading: 'The event',
    body: [
      'FRFM is organising a table football series for people who work in companies. Each company sends one or more teams, and the teams play a series of matches against teams from other companies.',
      'It is a simple way to get colleagues out of the office, build a team and meet people from other companies. Beginners are welcome: we explain the rules before the first match.',
    ],
  },
  who: {
    heading: 'Who can join',
    intro: 'Register with the whole company, with one team, or with a group of colleagues.',
    options: {
      company: {
        title: 'Companies',
        body: 'Send one or more teams to represent your company in the series.',
      },
      team: {
        title: 'Teams and departments',
        body: 'Use the series as a teambuilding activity, without the rest of the company.',
      },
      colleagues: {
        title: 'Groups of colleagues',
        body: 'A good reason to start going out together and to play regularly.',
      },
    },
  },
  how: {
    heading: 'How to join',
    intro: 'Each company or team names one contact person. This person is our link to the players.',
    steps: [
      { title: 'Send the form', body: 'The contact person fills in the registration form on this page.' },
      { title: 'We get in touch', body: 'We call or write to you to confirm the number of players and teams.' },
      { title: 'Get the details', body: 'Before the series starts, you receive the date, the venue and the rules.' },
      { title: 'Play the series', body: 'Your teams play their matches against teams from other companies.' },
    ],
  },
  faq: {
    heading: 'Questions',
    items: [
      {
        id: 'experience',
        q: 'Do our players need table football experience?',
        a: 'No. The series is open to all levels. We explain the rules before the first match.',
      },
      {
        id: 'size',
        q: 'How many people can a company send?',
        a: 'Give us an estimate in the form. A company can send one team or more; we confirm the final number with you.',
      },
      {
        id: 'team',
        q: 'Can one team from a company join on its own?',
        a: 'Yes. A department, a project team or a group of colleagues can register without the rest of the company.',
      },
      {
        id: 'when',
        q: 'When and where is the event?',
        a: 'The date and the venue are not set yet. We will announce them on this page. Registered contact persons hear first.',
      },
      {
        id: 'frequency',
        q: 'Is this a one-time event?',
        a: 'For now, yes. If interest grows, the series will run more often. Tick “Keep me informed about future editions” in the form.',
      },
      {
        id: 'commitment',
        q: 'Does registering commit my company to anything?',
        a: 'No. The form tells us that you are interested. We get in touch, and you decide once you have all the details.',
      },
    ],
  },
  facts: {
    label: 'Key facts',
    event: 'Event',
    eventValue: 'Corporate Series',
    edition: 'Edition',
    editionValue: 'First edition',
    date: 'Date',
    dateValue: 'To be announced',
    venue: 'Venue',
    venueValue: 'To be announced',
    openTo: 'Open to',
    openToValue: 'Companies, teams, groups of colleagues',
    level: 'Level',
    levelValue: 'All levels',
  },
  future: {
    eyebrow: 'Future editions',
    body: 'One edition for now. If interest grows, the series will run more often.',
    link: 'Keep me informed',
  },
  form: {
    heading: 'Register your company',
    intro:
      'Are you the contact person for your company or your team? Fill in the form and we will get in touch to plan your participation.',
    optional: 'Optional',
    fields: {
      company: 'Company',
      companyPlaceholder: 'Company name',
      name: 'Your name',
      namePlaceholder: 'Full name',
      email: 'Email',
      emailPlaceholder: 'name@company.ro',
      phone: 'Phone',
      phonePlaceholder: '07xx xxx xxx',
      role: 'Your role',
      rolePlaceholder: 'e.g. HR manager, team lead',
      city: 'City',
      cityPlaceholder: 'Where most players are based',
      participation: 'Which option fits you best?',
      players: 'Number of players',
      playersPlaceholder: 'Choose an estimate',
      message: 'Message',
      messagePlaceholder: 'Anything we should know? For example, the days or times that suit your players.',
      updates: 'Keep me informed about future editions of the series.',
    },
    participation: {
      company: { title: 'Company', body: 'We want to send one or more company teams.' },
      team: { title: 'Team or department', body: 'We want a teambuilding activity for our team.' },
      colleagues: { title: 'Group of colleagues', body: 'We want to start playing together regularly.' },
    },
    players: {
      '2-4': '2–4 players',
      '5-10': '5–10 players',
      '11-20': '11–20 players',
      '20+': 'More than 20 players',
      unsure: 'Not sure yet',
    },
    submit: 'Send registration',
    submitting: 'Sending…',
    disclaimer: 'By sending you agree to our <privacy>privacy notice</privacy>.',
    sent: 'Thanks — your registration has been sent. We will get in touch soon.',
    error: "Couldn't send your registration. Please try again, or email us at {{email}}.",
  },
}

export default corporate
