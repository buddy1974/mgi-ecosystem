// ============================================================
// HOREB SOLUTIONS — SOURCE OF TRUTH CONTENT FILE
// Do not hardcode this data anywhere in page.tsx
// Import from here everywhere
// ============================================================

export const HOREB_META = {
  title: 'Horeb Solutions Sarl | Distribution de manuels scolaires au Cameroun',
  description:
    "Horeb Solutions Sarl est votre partenaire de la distribution au Cameroun, spécialisé dans la diffusion de manuels scolaires, fournitures scolaires et matériels didactiques à travers un réseau d'agences et de partenaires.",
  keywords:
    'Horeb Solutions, distribution manuels scolaires Cameroun, fournitures scolaires Cameroun, matériel didactique Cameroun, agence distribution scolaire Yaoundé, distribution livres scolaires Douala, partenaire distribution Cameroun',
  url: 'https://horebsolutions.org',
  ogImage: '/og/horeb-og.jpg',
};

export const HOREB_CONTACT = {
  address: 'Immeuble CCA, Marché Central Yaoundé',
  bp: 'BP : 31750 Yaoundé, Cameroun',
  phoneDisplay: '237 237 222 23 36 65',
  phoneFull: '+237 237 222 23 36 65',
  phoneTel: 'tel:+237237222233665',
  email: 'info@horebsolutions.com',
  emailLink: 'mailto:info@horebsolutions.com',
  social: 'Horebsolutions',
};

// Used in hero trust strip and stats sections
export const HOREB_STATS = [
  { value: 'Depuis 2019', label: '' },
  { value: '6', label: 'Agences Horeb' },
  { value: 'Réseau', label: 'national' },
  { value: '10', label: 'Partenaires relais' },
  { value: '6', label: 'Partenaires détaillants' },
];

export const HOREB_SERVICES = [
  {
    id: 'manuels',
    icon: '📚',
    title: 'Manuels scolaires',
    description:
      "Distribution de manuels scolaires agréés pour accompagner les élèves, enseignants, librairies et établissements dans l'accès aux ressources éducatives essentielles.",
    image: '/books-mounted.png',
    imageAlt: 'Manuels scolaires empilés — distribution Horeb Solutions',
  },
  {
    id: 'fournitures',
    icon: '✏️',
    title: 'Fournitures scolaires',
    description:
      "Cahiers, stylos, cartables, articles scolaires et fournitures nécessaires à la rentrée et au fonctionnement quotidien des établissements.",
    image: '/books-again.png',
    imageAlt: 'Fournitures et manuels scolaires — Horeb Solutions Cameroun',
  },
  {
    id: 'didactique',
    icon: '🎯',
    title: 'Matériels didactiques',
    description:
      "Supports pédagogiques et matériels d'enseignement destinés à renforcer l'apprentissage, l'encadrement scolaire et la qualité de l'éducation.",
    image: '/hero-2.png',
    imageAlt: "Matériels didactiques pour l'enseignement au Cameroun",
  },
  {
    id: 'diffusion',
    icon: '🚚',
    title: 'Diffusion & distribution',
    description:
      "Organisation d'un réseau de proximité pour rapprocher les produits scolaires des utilisateurs finaux dans les différentes régions du Cameroun.",
    image: '/truck-on-the-move.png',
    imageAlt: 'Camion de livraison Horeb Solutions — distribution nationale au Cameroun',
  },
];

// ============================================================
// AGENCIES — SOURCE OF TRUTH
// phone: null = numéro non communiqué
// Display fallback: "Contactez le siège — +237 237 222 23 36 65"
// ============================================================
export interface Agency {
  id: string;
  city: string;
  zone: string;
  region: string;
  phone: string | null;
  phoneTel: string | null;
  note?: string;
}

export const HOREB_AGENCIES: Agency[] = [
  // CENTRE
  {
    id: 'yaounde-simbock',
    city: 'Yaoundé',
    zone: 'Simbock',
    region: 'Centre',
    phone: '(+237) 222 315 863',
    phoneTel: 'tel:+237222315863',
  },
  {
    id: 'yaounde-etoa-meki',
    city: 'Yaoundé',
    zone: 'Etoa Meki',
    region: 'Centre',
    phone: null,
    phoneTel: null,
  },
  {
    id: 'yaounde-elig-edzoa',
    city: 'Yaoundé',
    zone: 'Elig-Edzoa',
    region: 'Centre',
    phone: null,
    phoneTel: null,
    note: 'Sous-agence — numéro à confirmer',
  },
  // LITTORAL
  {
    id: 'douala-bonaberi',
    city: 'Douala',
    zone: 'Bonabéri',
    region: 'Littoral',
    phone: '(+237) 233 414 045',
    phoneTel: 'tel:+237233414045',
  },
  {
    id: 'douala-ndogsibi',
    city: 'Douala',
    zone: 'Ndogsibi',
    region: 'Littoral',
    phone: '(+237) 233 41 03 23',
    phoneTel: 'tel:+237233410323',
  },
  // OUEST
  {
    id: 'bafoussam',
    city: 'Bafoussam',
    zone: 'Centre-ville',
    region: 'Ouest',
    phone: '(+237) 233 441 300',
    phoneTel: 'tel:+237233441300',
  },
  // NORD
  {
    id: 'garoua',
    city: 'Garoua',
    zone: 'Centre-ville',
    region: 'Nord',
    phone: null,
    phoneTel: null,
  },
];

// ============================================================
// PARTENAIRES RELAIS — 10 cities
// ============================================================
export const HOREB_PARTNERS_RELAY = [
  { city: 'Maroua', region: 'Extrême-Nord' },
  { city: 'Ngaoundéré', region: 'Adamaoua' },
  { city: 'Yaoundé Emia', region: 'Centre' },
  { city: 'Douala Mbopi', region: 'Littoral' },
  { city: 'Nkongsamba', region: 'Littoral' },
  { city: 'Bertoua', region: 'Est' },
  { city: 'Dschang', region: 'Ouest' },
  { city: 'Bamenda', region: 'Nord-Ouest' },
  { city: 'Buea', region: 'Sud-Ouest' },
  { city: 'Limbe', region: 'Sud-Ouest' },
];

// ============================================================
// PARTENAIRES DÉTAILLANTS — 6 locations
// ============================================================
export const HOREB_PARTNERS_RETAIL = [
  { city: 'Douala', zone: 'Bonamoussadi' },
  { city: 'Douala', zone: 'Brazaville' },
  { city: 'Yaoundé', zone: 'Emana' },
  { city: 'Yaoundé', zone: 'Ekounou' },
  { city: 'Yaoundé', zone: 'Tam-tam' },
  { city: 'Bafoussam', zone: 'Marché B' },
];

export const HOREB_VISION_MISSION = {
  vision: {
    icon: '👁️',
    title: 'Notre vision',
    text: "Devenir un acteur incontournable de la distribution des manuels scolaires, fournitures scolaires et matériels didactiques au Cameroun, en combinant proximité, fiabilité logistique et solutions technologiques modernes.",
  },
  mission: {
    icon: '🎯',
    title: 'Notre mission',
    text: "Faciliter la disponibilité des manuels scolaires agréés et des fournitures éducatives partout au Cameroun, afin de soutenir une éducation de qualité et garantir que les ressources essentielles arrivent là où elles sont nécessaires.",
  },
};

export const HOREB_MGI = {
  name: 'MGI Group',
  tagline: 'Une entreprise du groupe MGI',
  description:
    "Horeb Solutions Sarl fait partie du groupe Mina-Galeed Invest (MGI) Ltd, un écosystème d'entreprises engagé dans la croissance, la structuration et le développement de solutions à impact.",
  url: 'https://mgi-ventures.com',
  cta: 'Découvrir MGI',
};
