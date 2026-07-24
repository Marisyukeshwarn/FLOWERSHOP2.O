import { NextResponse } from 'next/server';
import { galleryStore } from '@/lib/galleryStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(galleryStore.images);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newImage = {
      id: `gal_${Date.now()}`,
      url: data.url,
      caption: data.caption || '',
    };
    galleryStore.images.unshift(newImage);
    return NextResponse.json(newImage, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}
