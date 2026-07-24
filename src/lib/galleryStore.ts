// In-memory gallery store (survives hot reload in dev)
interface GalleryStore {
  images: { id: string; url: string; caption: string }[];
}

const globalForGallery = global as unknown as { galleryStore: GalleryStore };

export const galleryStore = globalForGallery.galleryStore || {
  images: [],
};

if (process.env.NODE_ENV !== 'production') globalForGallery.galleryStore = galleryStore;
