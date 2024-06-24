import type { Metadata } from 'next';
import LeftBar from './LeftBar';

export const metadata: Metadata = {
  title: 'Dashboard | Printcraft',
  description: 'printcraft user dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-neutral-50">
      <div className="sm:container sm:mx-auto flex items-start gap-x-4 pt-10 px-4">
        <LeftBar />
        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
}
