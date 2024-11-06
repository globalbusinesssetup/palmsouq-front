import Orders from '@/app/(dashboard)/dashboard/orders/page';

export const metadata = {
  title: 'My Orders | Palmsouq',
  description: 'Palmsouq user Orders',
};

const MyOrders = () => {
  return (
    <main className="pt-6 container mx-auto">
      <Orders />
    </main>
  );
};

export default MyOrders;
