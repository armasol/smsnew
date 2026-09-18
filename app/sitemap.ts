import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base='https://launchsms.fun';
  const routes=['','/docs','/privacy','/terms'];
  return routes.map((path): MetadataRoute.Sitemap[number] => ({
    url:`${base}${path}`,
    lastModified:new Date(),
    changeFrequency:path?'monthly':'weekly',
    priority:path?0.6:1
  }));
}
