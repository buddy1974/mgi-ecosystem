import { prisma } from '@mgi/database';

export { prisma };

export const PROGRAMS: Record<string, {
  name: string;
  amount: number;
  currency: string;
  payunitLink: string;
  webhookKeywords: string[];
}> = {
  'dominion-life': {
    name: "Dominion Life Men's Conference",
    amount: 50000,
    currency: 'XAF',
    payunitLink: 'https://lk.payunit.net/pay/45b2ad32-cea0-4597-b67b-ef45519de85d',
    webhookKeywords: ['dominion life', 'dominion'],
  },
  'men-on-duty': {
    name: 'Men On Duty',
    amount: 50000,
    currency: 'XAF',
    payunitLink: 'https://lk.payunit.net/pay/37a5898c-0ce9-47bd-88a7-c7e85a2273dd',
    webhookKeywords: ['men on duty', 'men duty'],
  },
  'ceo-on-mission': {
    name: 'CEO On Mission',
    amount: 50000,
    currency: 'XAF',
    payunitLink: 'https://lk.payunit.net/pay/62624100-f09b-4bc9-bd80-b20be17b659b',
    webhookKeywords: ['ceo on mission', 'ceo mission'],
  },
};

export function resolveProgram(productName: string): string | null {
  if (!productName) return null;
  const name = productName.toLowerCase();
  for (const [key, config] of Object.entries(PROGRAMS)) {
    if (config.webhookKeywords.some(kw => name.includes(kw))) {
      return key;
    }
  }
  return null;
}

export function buildReference(program: string): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 900) + 100;
  const prefix = program === 'dominion-life' ? 'DL'
    : program === 'men-on-duty' ? 'MOD'
    : 'COM';
  return `RN-${prefix}-${year}-${seq}`;
}
