import { prisma } from '@/lib/prisma';
import ProductManagerClient from './ProductManagerClient';

export default async function ProductManagerPage() {
  const products = await prisma.product.findMany({
    orderBy: { category: 'asc' }
  });

  return <ProductManagerClient initialProducts={products} />;
}
