import { NextResponse, NextRequest } from 'next/server';
import { testimonialsStore } from '@/lib/testimonialsStore';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  testimonialsStore.items = testimonialsStore.items.filter(item => item.id !== id);
  return NextResponse.json({ success: true });
}
