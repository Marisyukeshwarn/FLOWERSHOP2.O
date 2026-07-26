import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { FreshToday } from "@/components/home/FreshToday";
import { WeddingCollection } from "@/components/home/WeddingCollection";
import { EventCategories } from "@/components/home/EventCategories";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BulkOrders } from "@/components/home/BulkOrders";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <FreshToday />
      <WeddingCollection />
      <EventCategories />
      <FeaturedCollections />
      <BulkOrders />
      <InstagramGallery />
      <Testimonials />
    </>
  );
}
