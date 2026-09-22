import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export default function SEO({
  title = 'ElectriShop - Matériel électrique B2B',
  description = 'Fournisseur professionnel de matériel électrique. Disjoncteurs, câbles, ampoules LED, outillage. Livraison rapide et tarifs B2B.',
  keywords = 'matériel électrique, fournisseur électricien, disjoncteur, câble, ampoule LED, outillage, B2B',
  ogImage = '/og-image.jpg',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
