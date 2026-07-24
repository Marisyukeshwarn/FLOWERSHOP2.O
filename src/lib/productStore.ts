import { products as fallbackProducts } from './data';
import type { Product } from './data';

interface ProductStore {
  products: Product[];
}

const globalForProductStore = global as unknown as { productStore: ProductStore };

export const productStore = globalForProductStore.productStore || {
  products: [] as Product[],
};

if (process.env.NODE_ENV !== 'production') globalForProductStore.productStore = productStore;
