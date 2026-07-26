export interface Testimonial {
  id: string;
  name: string;
  event: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

interface TestimonialsStore {
  items: Testimonial[];
}

const globalForTestimonials = global as unknown as { testimonialsStore: TestimonialsStore };

export const testimonialsStore = globalForTestimonials.testimonialsStore || {
  items: [],
};

if (process.env.NODE_ENV !== 'production') globalForTestimonials.testimonialsStore = testimonialsStore;
