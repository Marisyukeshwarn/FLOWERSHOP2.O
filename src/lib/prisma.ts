import { PrismaClient } from '@prisma/client';

let prismaInstance: any = null;

function getPrisma() {
  if (!prismaInstance) {
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("johndoe:randompassword")) {
        prismaInstance = new PrismaClient();
      } else {
        prismaInstance = null;
      }
    } catch {
      prismaInstance = null;
    }
  }
  return prismaInstance;
}

export const prisma = new Proxy({} as any, {
  get(_target, prop) {
    const client = getPrisma();
    if (!client) {
      // Return dummy async functions if Prisma isn't configured
      return () => Promise.reject(new Error("Database not connected"));
    }
    return (client as any)[prop];
  },
});
