"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateProductStatus(id: string, status: string) {
  await prisma.product.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/admin/dashboard/products');
  revalidatePath('/menu');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
  revalidatePath('/admin/dashboard/products');
  revalidatePath('/menu');
}

export async function addOrUpdateProduct(data: any) {
  const { id, ...rest } = data;
  if (id) {
    await prisma.product.update({
      where: { id },
      data: rest
    });
  } else {
    await prisma.product.create({
      data: rest
    });
  }
  revalidatePath('/admin/dashboard/products');
  revalidatePath('/menu');
}
