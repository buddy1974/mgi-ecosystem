export interface SocialHandles {
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  youtube?: string
  tiktok?: string
}

export interface ProgramConfig {
  slug: string
  name: string
  shortName: string
}

export interface VentureConfig {
  slug: string
  name: string
  shortName?: string
  companyId: string
  domain: string
  tagline: string
  description?: string
  logoUrl?: string | null
  primaryColor: string
  accentColor: string
  font?: string | null
  status?: 'active' | 'coming_soon' | 'archived'
  programs: string[]
  programConfigs?: ProgramConfig[]
  social: SocialHandles
}

export const VENTURES: Record<string, VentureConfig> = {
  nmi: {
    slug: 'nmi',
    name: 'NMI Education',
    shortName: 'NMI',
    companyId: 'nmi',
    domain: 'nmieducation.com',
    tagline: 'Shaping the next generation',
    description: 'NMI Education — educational institution with an advanced existing OS platform.',
    logoUrl: '/logos/nmi-main.png',
    primaryColor: '#1D4ED8',
    accentColor: '#60A5FA',
    font: null,
    status: 'active',
    programs: [],
    social: {
      facebook: 'https://www.facebook.com/nmieducationsarl',
      instagram: 'https://www.instagram.com/nmieducation_cm/',
      linkedin: 'https://www.linkedin.com/company/78297252/',
      twitter: 'https://x.com/nmieducation_cm',
      youtube: 'https://www.youtube.com/@nmieducation5180',
    },
  },
  horeb: {
    slug: 'horeb',
    name: 'Horeb Solutions',
    shortName: 'Horeb',
    companyId: 'horeb',
    domain: 'horebsolutions.org',
    tagline: 'Fiabilité en mouvement',
    description: 'Horeb Solutions — faith-based solutions organization.',
    logoUrl: '/logos/horeb-solutions.png',
    primaryColor: '#0a8348',
    accentColor: '#0a8348',
    font: 'Roboto',
    status: 'active',
    programs: [],
    social: {
      facebook: 'https://www.facebook.com/horebsolutions',
      instagram: 'https://www.instagram.com/horebsolutions_cm/',
      twitter: 'https://x.com/horeb_solutions',
      youtube: 'https://www.youtube.com/@horebsolutions7461',
    },
  },
  lq: {
    slug: 'lq',
    name: 'Librairie du Quartier',
    shortName: 'LQ',
    companyId: 'lq',
    domain: 'librairieduquartier.org',
    tagline: 'La culture à votre portée',
    description: 'Librarie du Quartier — community bookstore and cultural space.',
    logoUrl: '/logos/librairie-du-quartier.png',
    primaryColor: '#393186',
    accentColor: '#393186',
    font: 'Helvetica',
    status: 'active',
    programs: [],
    social: {
      facebook: 'https://www.facebook.com/librairieduquartier',
      instagram: 'https://www.instagram.com/librairieduquartier_cm/',
      tiktok: 'https://www.tiktok.com/@librairieduquartier24',
    },
  },
  dros: {
    slug: 'dros',
    name: 'DROS Construction',
    shortName: 'DROS',
    companyId: 'dros',
    domain: 'drosconstruction.com',
    tagline: 'Building with precision',
    description: 'DROS Construction — construction and development company.',
    logoUrl: '/logos/dros-construction.png',
    primaryColor: '#023F78',
    accentColor: '#FC9D02',
    font: null,
    status: 'active',
    programs: [],
    social: {},
  },
  rogers: {
    slug: 'rogers',
    name: 'Rogers Nforgwei Platform',
    shortName: 'Rogers Platform',
    companyId: 'rogers',
    domain: 'rogersnforgwei.com',
    tagline: 'Switch on the better side of the future',
    description: "Personal platform of Daddy Rogers Nforgwei — CEO of MGI. Hosts Dominion Life Men's Conference, Men On Duty, and CEO On Mission programs.",
    logoUrl: null,
    primaryColor: '#3a0ca3',
    accentColor: '#f72585',
    font: 'Nexa',
    status: 'active',
    programs: [
      "Dominion Life Men's Conference",
      'Men On Duty',
      'CEO On Mission',
    ],
    programConfigs: [
      { slug: 'dominion-life-mens-conference', name: "Dominion Life Men's Conference", shortName: 'DLMC' },
      { slug: 'men-on-duty',                   name: 'Men On Duty',                    shortName: 'MOD'  },
      { slug: 'ceo-on-mission',                name: 'CEO On Mission',                 shortName: 'COM'  },
    ],
    social: {},
  },
  mgi: {
    slug: 'mgi',
    name: 'MGI Holding',
    shortName: 'MGI',
    companyId: 'mgi',
    domain: 'mina-galeed.com',
    tagline: 'Start well, Grow well',
    description: 'MGI Holding — parent company and shared services for all MGI ventures.',
    logoUrl: '/logos/mgi-main.png',
    primaryColor: '#92400E',
    accentColor: '#F59E0B',
    font: null,
    status: 'active',
    programs: [
      'Legal',
      'Accounting',
      'Digital Transformation',
      'HR',
      'Project Engineering',
      'Marketing Digital',
    ],
    social: {
      facebook: 'https://www.facebook.com/minagaleedinvest',
      linkedin: 'https://www.linkedin.com/company/101651608/',
    },
  },
  abba: {
    slug: 'abba',
    name: 'Abba Land Place by Drimp',
    shortName: 'Abba Land',
    companyId: 'abba',
    domain: 'abbalandplace.com',
    tagline: 'Coming soon',
    description: 'Abba Land Place by Drimp — currently in coming-soon phase.',
    logoUrl: '/logos/drimp-foundation.png',
    primaryColor: '#023F78',
    accentColor: '#023F78',
    font: 'Anton',
    status: 'coming_soon',
    programs: [],
    social: {},
  },
}

export const VENTURE_SLUGS = Object.keys(VENTURES) as Array<keyof typeof VENTURES>
