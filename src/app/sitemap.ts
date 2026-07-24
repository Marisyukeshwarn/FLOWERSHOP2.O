import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://suthiskabloom.com';

  const staticRoutes = [
    '',
    '/collections',
    '/wedding',
    '/temple',
    '/shop/customize',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real app with a DB, you would fetch all product slugs here.
  // For now, we will add a few known slugs as an example.
  const dynamicRoutes = [
    '/product/traditional-rose-wedding-mala',
    '/product/jasmine-and-rose-petal-mala',
    '/product/tirupati-style-tulsi-mala',
    '/product/premium-lotus-temple-mala',
    '/product/contemporary-orchid-garland',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
