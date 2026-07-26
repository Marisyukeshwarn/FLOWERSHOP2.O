import { NextResponse } from 'next/server';
import { testimonialsStore } from '@/lib/testimonialsStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(testimonialsStore.items);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTestimonial = {
      id: `tst_${Date.now()}`,
      name: data.name || 'Anonymous',
      event: data.event || '',
      location: data.location || '',
      rating: Number(data.rating) || 5,
      text: data.text || '',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    };
    testimonialsStore.items.unshift(newTestimonial);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}
