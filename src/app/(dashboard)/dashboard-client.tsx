'use client';
import LeftBar, { avatar } from './LeftBar';
import Image from 'next/image';
import { useGetUser } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: user, isLoading } = useQuery<any>({
    queryKey: ['user'],
    queryFn: useGetUser,
  });
  const { isLoggedIn } = useAuth();

  if (isLoading || !isLoggedIn) {
    if (!isLoading && !isLoggedIn) {
      router.push('/auth/sign-in');
    }
    return (
      <div className="w-screen h-screen flex gap-x-10 bg-white px-6 py-10">
        <div className="sm:w-[150px] md:w-[200px] lg:w-[264px] h-full bg-gray-200 rounded animate-pulse flex flex-col gap-y-5 px-4 py-5">
          <div className="w-full h-7 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-7 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-7 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-7 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-7 bg-gray-300 animate-pulse rounded" />
          <div className="w-full h-7 bg-gray-300 animate-pulse rounded" />
        </div>
        <div className="flex-1 h-full bg-gray-200 animate-pulse px-5 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <main className="bg-neutral-50 min-h-screen pt-20 md:pt-16">
        <div className="relative flex items-end justify-center px-4 pl-[72px] xs:pl-20 sm:pl-[170px] md:pl-[220px] lg:pl-[300px]">
          <LeftBar user={user?.data} />
          <section className="flex-1 w-full pb-5 2xl:pr-44">
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
                  {`${user?.data?.first_name} ${user?.data?.last_name}`}
                </h6>
              </div>
              <div className="text-center">
                <p className="text-xs xs:text-sm text-white">
                  {user?.data.email}
                </p>
                <p className="text-xs xs:text-sm text-white">
                  {user?.data.phone}{' '}
                </p>
              </div>
            </div>
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
