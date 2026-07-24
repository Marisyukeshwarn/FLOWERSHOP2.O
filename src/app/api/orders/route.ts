import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventEmitter } from '@/lib/eventEmitter';

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    let ipData = rateLimit.get(ip);
    
    if (!ipData || ipData.timestamp < windowStart) {
      ipData = { count: 1, timestamp: now };
    } else {
      ipData.count++;
    }
    
    rateLimit.set(ip, ipData);
    
    if (ipData.count > MAX_REQUESTS) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { items, total, customerDetails } = body;

    const newOrder = await prisma.order.create({
      data: {
        total: total || 0,
        customerName: customerDetails?.firstName && customerDetails?.lastName ? `${customerDetails.firstName} ${customerDetails.lastName}` : customerDetails?.firstName || null,
        customerEmail: customerDetails?.email || null,
        customerPhone: customerDetails?.phone || null,
        deliveryAddress: customerDetails?.address || null,
        city: customerDetails?.city || null,
        pincode: customerDetails?.pincode || null,
        deliveryDate: customerDetails?.deliveryDate || null,
        deliveryTime: customerDetails?.deliveryTime || null,
        specialInstructions: customerDetails?.specialInstructions || null,
        items: {
          create: items?.map((item: any) => ({
            name: item.name,
            qty: item.qty,
            size: item.size || null,
            price: item.price
          })) || []
        }
      },
      include: { items: true }
    });

    // Emit event for real-time updates
    eventEmitter.emit('order-update', { type: 'NEW_ORDER', order: newOrder });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
