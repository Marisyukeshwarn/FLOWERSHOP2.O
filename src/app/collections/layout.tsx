import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Premium Flower Malas & Garlands | MAHALAKSHMI',
  description: 'Explore our exquisite collection of premium flower malas, wedding garlands, and temple offerings. Custom designs with fresh roses, jasmine, and orchids.',
  alternates: {
    canonical: '/collections'
  }
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
