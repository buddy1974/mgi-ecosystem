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
  companyId: string
  domain: string
  tagline: string
  primaryColor: string
  accentColor: string
  programs: string[]
  programConfigs?: ProgramConfig[]
  social: SocialHandles
}

export const VENTURES: Record<string, VentureConfig> = {
  nmi: {
    slug: 'nmi',
    name: 'NMI Education',
    companyId: 'nmi',
    domain: 'nmieducation.com',
    tagline: 'Shaping the next generation',
    primaryColor: '#1D4ED8',
    accentColor: '#60A5FA',
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
    companyId: 'horeb',
    domain: 'horebsolutions.org',
    tagline: 'Fiabilité en mouvement',
    primaryColor: '#0a8348',
    accentColor: '#fdda2b',
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
    companyId: 'lq',
    domain: 'librairieduquartier.org',
    tagline: 'La culture à votre portée',
    primaryColor: '#393186',
    accentColor: '#EF7F1B',
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
    companyId: 'dros',
    domain: 'drosconstruction.com',
    tagline: 'Building with precision',
    primaryColor: '#023F78',
    accentColor: '#FC9D02',
    programs: [],
    social: {},
  },
  rogers: {
    slug: 'rogers',
    name: 'Rogers Nforgwei',
    companyId: 'rogers',
    domain: 'rogersnforgwei.com',
    tagline: 'Switch on the better side of the future',
    primaryColor: '#3a0ca3',
    accentColor: '#f72585',
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
    companyId: 'mgi',
    domain: 'mina-galeed.com',
    tagline: 'Start well, Grow well',
    primaryColor: '#92400E',
    accentColor: '#F59E0B',
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
}

export const VENTURE_SLUGS = Object.keys(VENTURES) as Array<keyof typeof VENTURES>
