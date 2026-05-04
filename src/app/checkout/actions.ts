"use server";

import { prisma } from '@/lib/prisma';

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  paymentMethod: string;
  paymentAmount?: number;
  items: any[];
}) {
  const order = await prisma.order.create({
    data: {
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      total: data.total,
      paymentMethod: data.paymentMethod,
      paymentAmount: data.paymentAmount,
      items: JSON.stringify(data.items),
    }
  });
  return order;
}
