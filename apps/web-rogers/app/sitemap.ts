import type { MetadataRoute } from 'next'

const BASE = 'https://www.rogersnforgwei.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1    },
    { url: `${BASE}/programs/dominion-life`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/programs/men-on-duty`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/programs/ceo-on-mission`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/about`,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/coaching`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/events`,                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/testimonials`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE}/contact`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6  },
  ]
}
