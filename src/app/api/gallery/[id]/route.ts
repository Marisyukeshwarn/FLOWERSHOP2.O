import { NextResponse, NextRequest } from 'next/server';
import { galleryStore } from '@/lib/galleryStore';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  galleryStore.images = galleryStore.images.filter(img => img.id !== id);
  return NextResponse.json({ success: true });
}
