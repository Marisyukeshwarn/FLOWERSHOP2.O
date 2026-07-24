import { NextResponse } from 'next/server';
import { galleryStore } from '@/lib/galleryStore';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  galleryStore.images = galleryStore.images.filter(img => img.id !== params.id);
  return NextResponse.json({ success: true });
}
