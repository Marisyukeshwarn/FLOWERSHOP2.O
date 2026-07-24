import { NextResponse } from 'next/server';
import { productStore } from '@/lib/productStore';
import { eventEmitter } from '@/lib/eventEmitter';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(productStore.products);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Ensure slug uniqueness
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `product-${Date.now()}`;
    const existingSlug = productStore.products.find(p => p.slug === slug);
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const newProduct = {
      id: data.id || `prd_${Date.now()}`,
      name: data.name,
      category: data.category,
      subcategory: data.subcategory || 'Standard',
      flowers: data.flowers || ['Rose'],
      occasion: data.occasion || ['Wedding'],
      images: data.images || [],
      slug: finalSlug,
      description: data.description || '',
      shortDescription: data.shortDescription || '',
      variants: data.variants || [{ size: 'Standard', price: 450, stock: 20 }],
      rating: data.rating || 4.9,
      reviewCount: data.reviewCount || 0,
      isNew: data.isNew ?? true,
      isBestSeller: data.isBestSeller ?? false,
      isFeatured: data.isFeatured ?? false,
      freshToday: data.freshToday ?? true,
      isPremium: data.isPremium ?? false,
      estimatedLife: data.estimatedLife || '24–36 hours',
      weight: data.weight,
      tags: data.tags || [data.category],
      badge: data.badge || 'New',
    };

    productStore.products.unshift(newProduct as any);
    eventEmitter.emit('product-update', { type: 'ADD_PRODUCT', product: newProduct });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
