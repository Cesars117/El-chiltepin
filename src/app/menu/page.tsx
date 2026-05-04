import { prisma } from '@/lib/prisma';
import MenuClient from './MenuClient';

export default async function MenuPage() {
  const products = await prisma.product.findMany({
    where: {
      status: {
        in: ['active', 'out_of_stock']
      }
    }
  });

  return <MenuClient initialProducts={products} />;
}
