import type { Metadata } from 'next';
import LeftBar, { avatar } from './LeftBar';
import Image from 'next/image';

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
        <section className="flex-1 w-full pb-5">
          <div className="flex py-4 xs:py-6 mb-4 bg-gradient-to-l to-[#002169] from-[#002169B5] md:hidden flex-row items-center justify-between rounded-lg px-4 xs:px-6 sm:px-8">
            <div className="flex items-center gap-x-2 sm:gap-x-4">
              <div className="size-10 sm:size-12 rounded-full overflow-hidden border-[1.5px] border-white relative mx-auto">
                <Image
                  src={avatar}
                  alt="user avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <h6 className="text-xs xs:text-sm font-semibold text-white">
                Jhon Millar
              </h6>
            </div>
            <div className="text-center">
              <p className="text-xs xs:text-sm text-white">
                {'info@printcraft.ae'}
              </p>
              <p className="text-xs xs:text-sm text-white">
                {'+971 55 1234567'}{' '}
              </p>
            </div>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
