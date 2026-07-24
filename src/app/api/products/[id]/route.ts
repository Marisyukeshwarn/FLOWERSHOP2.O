import { NextResponse } from 'next/server';
import { productStore } from '@/lib/productStore';
import { eventEmitter } from '@/lib/eventEmitter';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const idx = productStore.products.findIndex(p => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Merge existing product with updated fields
    const updated = {
      ...productStore.products[idx],
      ...data,
      id, // Ensure id doesn't change
    };

    productStore.products[idx] = updated;
    eventEmitter.emit('product-update', { type: 'UPDATE_PRODUCT', product: updated });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const idx = productStore.products.findIndex(p => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    productStore.products.splice(idx, 1);
    eventEmitter.emit('product-update', { type: 'DELETE_PRODUCT', productId: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
