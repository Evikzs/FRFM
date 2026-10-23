import type en from '../en/corporate'

// "corporate" namespace: the Corporate Series page.
// EDIT WHEN LIVE: facts.dateValue, facts.venueValue and faq item "when".
const corporate: typeof en = {
  meta: { title: 'Seria Corporate' },
  eyebrow: 'Seria Corporate · Prima ediție',
  title: 'Adu-ți echipa la masă',
  intro:
    'O serie de meciuri de fotbal de masă pentru companii. Înscrie-ți compania, adu-ți colegii și joacă împotriva echipelor altor companii. Nu ai nevoie de experiență.',
  cta: { register: 'Înscrie-ți compania', how: 'Cum funcționează' },
  sectionNav: {
    label: 'În această secțiune',
    event: 'Evenimentul',
    who: 'Cine se poate înscrie',
    how: 'Cum te înscrii',
    faq: 'Întrebări',
    register: 'Înscriere',
  },
  event: {
    heading: 'Evenimentul',
    body: [
      'FRFM organizează o serie de meciuri de fotbal de masă pentru angajații companiilor. Fiecare companie trimite una sau mai multe echipe, iar echipele joacă o serie de meciuri împotriva echipelor altor companii.',
      'Este un mod simplu de a-ți scoate colegii din birou, de a construi o echipă și de a cunoaște oameni din alte companii. Începătorii sunt bineveniți: explicăm regulile înainte de primul meci.',
    ],
  },
  who: {
    heading: 'Cine se poate înscrie',
    intro: 'Te poți înscrie cu toată compania, cu o singură echipă sau cu un grup de colegi.',
    options: {
      company: {
        title: 'Companii',
        body: 'Trimite una sau mai multe echipe care să-ți reprezinte compania în serie.',
      },
      team: {
        title: 'Echipe și departamente',
        body: 'Folosește seria ca activitate de teambuilding, fără restul companiei.',
      },
      colleagues: {
        title: 'Grupuri de colegi',
        body: 'Un motiv bun să ieșiți împreună și să jucați în mod regulat.',
      },
    },
  },
  how: {
    heading: 'Cum te înscrii',
    intro: 'Fiecare companie sau echipă desemnează o persoană de contact. Această persoană este legătura noastră cu jucătorii.',
    steps: [
      { title: 'Trimite formularul', body: 'Persoana de contact completează formularul de înscriere de pe această pagină.' },
      { title: 'Te contactăm', body: 'Te sunăm sau îți scriem ca să confirmăm numărul de jucători și de echipe.' },
      { title: 'Primești detaliile', body: 'Înainte de începerea seriei primești data, locația și regulile.' },
      { title: 'Joacă seria', body: 'Echipele tale își joacă meciurile împotriva echipelor altor companii.' },
    ],
  },
  faq: {
    heading: 'Întrebări',
    items: [
      {
        id: 'experience',
        q: 'Jucătorii noștri au nevoie de experiență la fotbal de masă?',
        a: 'Nu. Seria este deschisă tuturor nivelurilor. Explicăm regulile înainte de primul meci.',
      },
      {
        id: 'size',
        q: 'Câte persoane poate trimite o companie?',
        a: 'Dă-ne o estimare în formular. O companie poate trimite una sau mai multe echipe; numărul final îl stabilim împreună.',
      },
      {
        id: 'team',
        q: 'Se poate înscrie o singură echipă dintr-o companie?',
        a: 'Da. Un departament, o echipă de proiect sau un grup de colegi se poate înscrie fără restul companiei.',
      },
      {
        id: 'when',
        q: 'Când și unde are loc evenimentul?',
        a: 'Data și locația nu sunt stabilite încă. Le anunțăm pe această pagină. Persoanele de contact înscrise află primele.',
      },
      {
        id: 'frequency',
        q: 'Este un eveniment unic?',
        a: 'Deocamdată, da. Dacă interesul crește, seria va avea loc mai des. Bifează „Ține-mă la curent cu edițiile viitoare” în formular.',
      },
      {
        id: 'commitment',
        q: 'Înscrierea obligă compania la ceva?',
        a: 'Nu. Formularul ne arată doar că ești interesat. Te contactăm, iar tu decizi după ce ai toate detaliile.',
      },
    ],
  },
  facts: {
    label: 'Repere esențiale',
    event: 'Eveniment',
    eventValue: 'Seria Corporate',
    edition: 'Ediție',
    editionValue: 'Prima ediție',
    date: 'Data',
    dateValue: 'Urmează să fie anunțată',
    venue: 'Locație',
    venueValue: 'Urmează să fie anunțată',
    openTo: 'Pentru cine',
    openToValue: 'Companii, echipe, grupuri de colegi',
    level: 'Nivel',
    levelValue: 'Toate nivelurile',
  },
  future: {
    eyebrow: 'Edițiile viitoare',
    body: 'Deocamdată, o singură ediție. Dacă interesul crește, seria va avea loc mai des.',
    link: 'Ține-mă la curent',
  },
  form: {
    heading: 'Înscrie-ți compania',
    intro:
      'Ești persoana de contact pentru compania sau echipa ta? Completează formularul și te contactăm ca să planificăm participarea.',
    optional: 'Opțional',
    fields: {
      company: 'Companie',
      companyPlaceholder: 'Numele companiei',
      name: 'Numele tău',
      namePlaceholder: 'Nume complet',
      email: 'Email',
      emailPlaceholder: 'nume@companie.ro',
      phone: 'Telefon',
      phonePlaceholder: '07xx xxx xxx',
      role: 'Rolul tău',
      rolePlaceholder: 'ex. manager HR, team lead',
      city: 'Oraș',
      cityPlaceholder: 'Unde sunt majoritatea jucătorilor',
      participation: 'Ce variantă ți se potrivește?',
      players: 'Număr de jucători',
      playersPlaceholder: 'Alege o estimare',
      message: 'Mesaj',
      messagePlaceholder: 'Ceva ce ar trebui să știm? De exemplu, zilele sau orele care le convin jucătorilor.',
      updates: 'Ține-mă la curent cu edițiile viitoare ale seriei.',
    },
    participation: {
      company: { title: 'Companie', body: 'Vrem să trimitem una sau mai multe echipe ale companiei.' },
      team: { title: 'Echipă sau departament', body: 'Vrem o activitate de teambuilding pentru echipa noastră.' },
      colleagues: { title: 'Grup de colegi', body: 'Vrem să începem să jucăm împreună în mod regulat.' },
    },
    players: {
      '2-4': '2–4 jucători',
      '5-10': '5–10 jucători',
      '11-20': '11–20 de jucători',
      '20+': 'Peste 20 de jucători',
      unsure: 'Nu știu încă',
    },
    submit: 'Trimite înscrierea',
    submitting: 'Se trimite…',
    disclaimer: 'Trimițând, ești de acord cu <privacy>politica noastră de confidențialitate</privacy>.',
    sent: 'Mulțumim — înscrierea ta a fost trimisă. Te contactăm în curând.',
    error: 'Înscrierea nu a putut fi trimisă. Încearcă din nou sau scrie-ne la {{email}}.',
  },
}

export default corporate
