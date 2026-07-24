import { Metadata } from 'next';
import { productStore } from '@/lib/productStore';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = productStore.products.find((p: any) => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | SUTHISKA Bloom Studio'
    };
  }

  return {
    title: `${product.name} | SUTHISKA Bloom Studio`,
    description: product.description,
    openGraph: {
      title: `${product.name} | SUTHISKA Bloom Studio`,
      description: product.description,
      images: product.images && product.images.length > 0 ? [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        }
      ] : []
    },
    alternates: {
      canonical: `/product/${params.slug}`
    }
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
