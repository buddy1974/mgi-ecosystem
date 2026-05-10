export const ENTITY_PLATFORMS: Record<string, string[]> = {
  nmi:    ['FACEBOOK', 'INSTAGRAM', 'LINKEDIN', 'TWITTER', 'YOUTUBE'],
  horeb:  ['FACEBOOK', 'INSTAGRAM', 'TWITTER', 'YOUTUBE'],
  lq:     ['FACEBOOK', 'INSTAGRAM', 'TIKTOK'],
  dros:   [],
  rogers: ['FACEBOOK', 'INSTAGRAM', 'LINKEDIN'],
  mgi:    ['FACEBOOK', 'LINKEDIN'],
}

export const PLATFORM_CHAR_LIMITS: Record<string, number> = {
  TWITTER:   280,
  INSTAGRAM: 2200,
  TIKTOK:    2200,
  FACEBOOK:  63206,
  LINKEDIN:  3000,
  YOUTUBE:   5000,
}

export const PLATFORM_LABELS: Record<string, string> = {
  FACEBOOK:  'Facebook',
  INSTAGRAM: 'Instagram',
  LINKEDIN:  'LinkedIn',
  TWITTER:   'X / Twitter',
  YOUTUBE:   'YouTube',
  TIKTOK:    'TikTok',
}

export const COMPANY_NAMES: Record<string, string> = {
  nmi:    'NMI Education',
  horeb:  'Horeb Solutions',
  lq:     'Librairie du Quartier',
  dros:   'DROS Construction',
  rogers: 'Rogers Nforgwei',
  mgi:    'MGI Holding',
}
