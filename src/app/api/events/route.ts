import { eventEmitter } from '@/lib/eventEmitter';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const enqueue = (data: any) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch (e) {
          // Controller may already be closed
        }
      };

      const orderListener = (data: any) => enqueue(data);
      const productListener = (data: any) => enqueue(data);

      eventEmitter.on('order-update', orderListener);
      eventEmitter.on('product-update', productListener);

      // Clean up on client disconnect
      request.signal.addEventListener('abort', () => {
        eventEmitter.off('order-update', orderListener);
        eventEmitter.off('product-update', productListener);
        try { controller.close(); } catch (e) {}
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
