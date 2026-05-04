import { prisma } from '@/lib/prisma';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  // Fetch real data from DB
  const [orders, costs, products] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.cost.findMany(),
    prisma.product.count()
  ]);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0);
  const netProfit = totalSales - totalCosts;

  return (
    <AdminDashboardClient 
      initialStats={{
        totalSales,
        totalCosts,
        netProfit,
        orderCount: orders.length,
        productCount: products
      }}
      recentOrders={orders}
    />
  );
}
