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
    <main className="bg-neutral-50 min-h-screen">
      <div className="w-full h-2 lg:h-5"></div>
      <div className="flex items-start px-4 pl-[72px] xs:pl-20 sm:pl-[170px] md:pl-[220px] lg:pl-[300px]">
        <LeftBar />
        <section className="flex-1 w-full pb-5">{children}</section>
      </div>
    </main>
  );
}
