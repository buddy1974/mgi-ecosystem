// MGI — Source de vérité unique pour tout le contenu du site
// Importez depuis ce fichier — ne jamais coder en dur dans page.tsx

export const MGI_META = {
  slogan: 'Start well, Grow well',
  positioning: 'Au Cœur de la performance des PME',
  since: 'Depuis 2019',
  description:
    "Mina-Galeed Invest (MGI) Ltd est une holding qui accompagne les entreprises dans leurs cycles de développement.",
  descriptionLong:
    "Mina-Galeed Invest (MGI) Ltd accompagne les entreprises dans leurs cycles de développement avec des solutions juridiques, comptables, fiscales, digitales, RH, marketing et d'ingénierie de projets.",
  url: 'https://www.mina-galeed.com',
  website: 'www.mina-galeed.com',
};

export const MGI_SERVICES = [
  {
    id: 'juridique',
    title: 'Assistance Juridique',
    image: '/mgi-images/service-juridique.png',
    imageAlt: 'Livres de droit, marteau et balance de la justice — Assistance Juridique MGI',
    description:
      "Grâce à une due-diligence et une veille légale et réglementaire, nos experts établissent des grilles d'analyse devant limiter les risques et les coûts et soutenir des choix éclairés dans vos décisions stratégiques.",
    bullets: [
      "Accompagnement à la Création et structuration des entreprises",
      "Analyse, négociation et rédaction des contrats : Statuts, contrats commerciaux et civils, accords de partenariat et conditions générales",
      "Veille juridique, prévention du contentieux, gestion du précontentieux et contentieux",
      "Secrétariat juridique : Organisation des AG, convocations, Procès-Verbaux des AG, Enregistrement fiscal, rapports de gestion",
      "Suivi des procédures de demande d'agréments, autorisations et licences",
    ],
  },
  {
    id: 'comptable',
    title: 'Assistance Comptable et Fiscale',
    image: '/mgi-images/service-comptable.png',
    imageAlt: 'Comptabilité et fiscalité — calculatrice, déclarations fiscales CNPS, MGI',
    description:
      "Le système comptable, fiscal et social étant au cœur du succès d'une entreprise, nos équipes d'experts font une due-diligence afin de vous proposer un système conforme, fiable, sincère, moins risqué et le plus approprié pour vous.",
    bullets: [
      "Traitement comptable",
      "Déclarations mensuelles des impôts et CNPS",
      "Installation et configuration des ERP/Logiciels",
      "Accompagnement lors des contrôles fiscaux",
      "Optimisation fiscale et renforcement des capacités",
    ],
  },
  {
    id: 'gouvernance',
    title: "Gouvernance d'entreprise",
    image: '/mgi-images/service-gouvernance.png',
    imageAlt: "Gouvernance d'entreprise — réunion stratégique entre professionnels",
    description:
      "Afin de transformer votre vision en réalité durable, nos équipes formulent des structures de gouvernance qui sécurisent et fluidifient vos processus décisionnels, assurent la transparence et garantissent la pérennité de votre organisation.",
    bullets: [
      "Politique générale d'entreprise",
      "Délimitation des pouvoirs, rôles, responsabilités et processus décisionnels",
      "Elaboration des Procédures : Manuel de procédures, Règlement Intérieur, Code d'éthique, etc.",
      "Conformité légale et réglementaire",
    ],
  },
  {
    id: 'digital',
    title: 'Transformation Digitale',
    image: '/mgi-images/service-digital.png',
    imageAlt: 'Transformation digitale — automatisation, intégration et workflows MGI',
    description:
      "Face aux défis technologiques, nous facilitons la migration de vos processus vers un système digital sécurisé afin de moderniser votre infrastructure, sécuriser vos données, vous démarquer de la concurrence, accroître l'expérience client.",
    bullets: [
      "Développement d'applications sur mesure : Application web, mobile, plateforme SaaS",
      "Automatisation et optimisation des processus : automatisation des workflows, gestion intelligente des données",
      "Intégration d'ERP et CRM : Gestion comptable et commerciale, RH, avec des outils comme Odoo, Salesforce ou Microsoft Dynamics",
      "Expérience utilisateur / refonte digitale : Sites web, interfaces UX/UI",
      "Cybersécurité et protection des données",
      "Stratégie cloud & hébergement sécurisé",
      "Solutions informatiques (IT), maintenance et réseaux",
      "Maintenance Préventive et curative",
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing digital',
    image: '/mgi-images/service-marketing.png',
    imageAlt: 'Marketing digital — stratégie digitale, réseaux sociaux et automatisation',
    description:
      "Le marketing digital est devenu un outil essentiel pour la croissance de l'entreprise moderne, nous construisons des outils performants pour accentuer votre présence, atteindre votre cible, accroître votre visibilité et briser les frontières.",
    bullets: [
      "Stratégie digitale & branding",
      "Gestion des réseaux sociaux (Community Management)",
      "Référencement naturel (SEO) & publicité payante (SEA)",
      "Email marketing & automation",
      "Création de contenu & storytelling",
      "Web analytics & optimisation des conversions (CRO)",
    ],
  },
  {
    id: 'rh',
    title: 'Prestations Rh',
    image: '/mgi-images/service-rh.jpeg',
    imageAlt: 'Ressources humaines — recrutement et gestion externalisée du personnel',
    description:
      "Grâce à une approche personnalisée, nous proposons des services visant au sourcing et screening des candidats, à automatiser la gestion de la paie, simplifier les déclarations sociales et la conformité avec la législation du travail.",
    bullets: [
      "Recrutement externalisé",
      "Placement de personnels et Mise A Disposition (MAD)",
      "Intérim",
      "Gestion externalisée de la paie",
      "Audit social",
    ],
  },
  {
    id: 'ingenierie',
    title: 'Ingénierie des projets',
    image: '/mgi-images/service-ingenierie.png',
    imageAlt: 'Ingénierie des projets — montage, planification et suivi-évaluation',
    description:
      "En matière de projets, bénéficiez de notre expertise pour le montage et la gestion de vos projets pour une meilleure planification et l'utilisation optimale du temps et de vos ressources tout en minimisant les risques.",
    bullets: [
      "Montage des projets",
      "Montage des business plans",
      "Suivi-Evaluation des projets et programmes",
      "Études d'impact socioéconomique et environnemental",
      "Études de danger",
      "Suivi des procédures administratives",
    ],
  },
];

export const MGI_VALUES = {
  slogan: '« Start well, Grow well »',
  valeurs: ['Intégrité', 'Excellence', 'Confidentialité', 'Innovation'],
  raisons: [
    'Une approche sur mesure',
    'Des technologies de pointe',
    'Un accompagnement de bout en bout',
    'Un impact mesurable',
    'Une évaluation des résultats',
  ],
  atoutsIntro:
    'Nous menons nos missions à la satisfaction de nos clients grâce à un ensemble de facteurs distinctifs :',
  atouts: [
    { label: 'Moyens humains', desc: 'Experts hautement qualifiés dans chaque domaine.' },
    { label: 'Nos méthodes', desc: "Nous faisons une analyse situationnelle pour dégager votre besoin." },
    { label: 'Moyens matériels et technologiques', desc: 'de dernière génération.' },
  ],
};

export const MGI_PARTNERS = [
  { name: 'NMI Education',             logo: '/logos/nmi-main.png' },
  { name: 'Horeb Solutions Sarl',      logo: '/logos/horeb-solutions.png' },
  { name: 'Librairie du Quartier Sarl', logo: '/logos/librairie-du-quartier.png' },
  { name: 'DROS Construction',         logo: '/logos/dros-construction.png' },
  { name: 'Drimp Foundation',          logo: '/logos/drimp-foundation.png' },
];

export const MGI_CONTACT = {
  siege:    'Biyem-Assi, Yaoundé - Cameroun',
  bp:       'BP 30374, Yaoundé - Cameroun',
  phone:    '(+237) 699 81 25 13',
  phoneTel: 'tel:+237699812513',
  email:    'contact@mina-galeed.com',
  emailLink:'mailto:contact@mina-galeed.com',
  website:  'www.mina-galeed.com',
  websiteUrl: 'https://www.mina-galeed.com',
  linkedin: 'MINA-GALEED INVEST',
  linkedinUrl: 'https://www.linkedin.com/company/101651608/',
  facebook: 'MINA-GALEED INVEST',
  facebookUrl: 'https://www.facebook.com/minagaleedinvest',
};

export const MGI_VENTURES = [
  {
    name:     'Rogers Nforgwei Platform',
    domain:   'rogersnforgwei.com',
    logo:     '/logos/rogers.png',
    color:    '#3a0ca3',
    accent:   '#f72585',
    tag:      'Leadership & Personal Platform',
    tagline:  "Switch on the better side of the future.",
    initials: 'RN',
  },
  {
    name:    'Horeb Solutions',
    domain:  'horebsolutions.org',
    logo:    '/logos/horeb-solutions.png',
    color:   '#0a8348',
    accent:  '#fdda2b',
    tag:     'Distribution & Logistique',
    tagline: "Fiabilité en mouvement. Votre partenaire de la distribution.",
    initials:'HS',
  },
  {
    name:    'NMI Education',
    domain:  'nmieducation.com',
    logo:    '/logos/nmi-main.png',
    color:   '#1a56db',
    accent:  '#60a5fa',
    tag:     'Éducation',
    tagline: "Empowering minds. Building futures.",
    initials:'NMI',
  },
  {
    name:    'Librairie du Quartier',
    domain:  'librairieduquartier.org',
    logo:    '/logos/librairie-du-quartier.png',
    color:   '#393186',
    accent:  '#EF7F1B',
    tag:     'Culture & Communauté',
    tagline: "Your neighborhood. Your knowledge.",
    initials:'LQ',
  },
  {
    name:    'DROS Construction',
    domain:  'drosconstruction.com',
    logo:    '/logos/dros-construction.png',
    color:   '#1c3a2e',
    accent:  '#a3855a',
    tag:     'Construction & Développement',
    tagline: "Building structures that stand the test of time.",
    initials:'DC',
  },
  {
    name:    'Abba Land Place',
    domain:  'abbalandplace.com',
    logo:    '/logos/abbaland.png',
    color:   '#110d07',
    accent:  '#c8a96e',
    tag:     'Hôtellerie & Lifestyle',
    tagline: "Something exceptional is coming.",
    initials:'ALP',
  },
  {
    name:         'Drimp Foundation',
    domain:       'drimpfoundation.org',
    logo:         '/logos/drimp-foundation.png',
    color:        '#023F78',
    accent:       '#FC9D02',
    tag:          'Impact Social & Humanitaire',
    tagline:      "Transforming communities. Restoring dignity.",
    externalLink: 'https://www.drimpfoundation.org',
    initials:     'DF',
  },
];
