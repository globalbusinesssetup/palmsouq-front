import Orders from '@/app/(dashboard)/dashboard/orders/page';

export const metadata = {
  title: 'My Orders | Shukransoouq',
  description: 'Shukransoouq user Orders',
};

const MyOrders = () => {
  return (
    <main className="pt-6 container mx-auto">
      <Orders />
    </main>
  );
};

export default MyOrders;
