import { mockOrders } from './data';

export type Order = {
  id: string;
  date: string;
  status: string;
  items: { name: string; qty: number; size?: string; price: number }[];
  total: number;
  trackingSteps: { label: string; done: boolean; time?: string }[];
};

interface OrderStore {
  orders: Order[];
}

const globalForStore = global as unknown as { orderStore: OrderStore };

export const orderStore = globalForStore.orderStore || {
  orders: [] as Order[],
};

if (process.env.NODE_ENV !== 'production') globalForStore.orderStore = orderStore;
