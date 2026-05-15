import type { Metadata } from 'next'

export const BASE_URL = 'https://www.rogersnforgwei.com'

export const SITE_DEFAULTS = {
  siteName:        'Rogers Nforgwei',
  baseUrl:         BASE_URL,
  twitterHandle:   '@rogers_nforgwei',
  defaultImage:    `${BASE_URL}/og/rogers-og-default.png`,
  defaultImageAlt: 'Apostle Dr. Rogers Ngalla Nforgwei — Faith-Based Leadership Coach',
}

export function buildMetadata({
  title,
  description,
  path = '',
  image,
  imageAlt,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  noIndex?: boolean
}): Metadata {
  const url      = `${BASE_URL}${path}`
  const ogImage  = image    ?? SITE_DEFAULTS.defaultImage
  const ogAlt    = imageAlt ?? SITE_DEFAULTS.defaultImageAlt

  return {
    title: `${title} | Rogers Nforgwei`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title:     `${title} | Rogers Nforgwei`,
      description,
      url,
      siteName:  SITE_DEFAULTS.siteName,
      images:    [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
      locale:    'en_US',
      type:      'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} | Rogers Nforgwei`,
      description,
      images:      [ogImage],
      creator:     SITE_DEFAULTS.twitterHandle,
      site:        SITE_DEFAULTS.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}
