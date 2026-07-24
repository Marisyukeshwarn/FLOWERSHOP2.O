import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MAHALAKSHMI Bloom Studio",
  description: "Learn about MAHALAKSHMI Bloom Studio, our passion for floral artistry, and our dedication to premium wedding malas and temple garlands.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
