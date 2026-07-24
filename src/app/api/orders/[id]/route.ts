import { NextResponse } from 'next/server';
import { orderStore, Order } from '@/lib/orderStore';
import { eventEmitter } from '@/lib/eventEmitter';

const STATUS_ORDER = ['processing', 'preparing', 'making', 'quality_check', 'packed', 'out_for_delivery', 'delivered'];

function getNextStatus(current: string): string {
  const idx = STATUS_ORDER.indexOf(current);
  if (idx === -1 || idx === STATUS_ORDER.length - 1) return current;
  return STATUS_ORDER[idx + 1];
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const orderIndex = orderStore.orders.findIndex((o: Order) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Support explicit status or auto-advance
    const newStatus = body.status ?? getNextStatus(orderStore.orders[orderIndex].status);
    orderStore.orders[orderIndex].status = newStatus;

    // Mark tracking steps done up to the current status
    const stepLabels: Record<string, string[]> = {
      processing: ['Order Placed'],
      preparing: ['Order Placed', 'Preparing'],
      making: ['Order Placed', 'Preparing', 'Making Mala'],
      quality_check: ['Order Placed', 'Preparing', 'Making Mala', 'Quality Check'],
      packed: ['Order Placed', 'Preparing', 'Making Mala', 'Quality Check', 'Packed'],
      out_for_delivery: ['Order Placed', 'Preparing', 'Making Mala', 'Quality Check', 'Packed', 'Out for Delivery'],
      delivered: ['Order Placed', 'Preparing', 'Making Mala', 'Quality Check', 'Packed', 'Out for Delivery', 'Delivered'],
    };

    const doneLabelSet = new Set(stepLabels[newStatus] ?? []);
    orderStore.orders[orderIndex].trackingSteps.forEach((step: { label: string; done: boolean; time?: string }) => {
      if (doneLabelSet.has(step.label)) {
        step.done = true;
        if (!step.time) step.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    });

    const updatedOrder = orderStore.orders[orderIndex];

    // Emit event for real-time updates
    eventEmitter.emit('order-update', { type: 'UPDATE_ORDER', order: updatedOrder });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
