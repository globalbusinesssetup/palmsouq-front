"use client"
import { Header, TopBar } from '@/components';
import { usePathname } from 'next/navigation';
import * as React from 'react';


export default function MainLayout({children}:{children:React.ReactNode}) {
    const pathname = usePathname();
    return (
        <main>
            <React.Suspense>
                {
                    pathname == '/' ? <TopBar />  : null
                }
                <Header showSearch />
            </React.Suspense>
            {children}
        </main>
    )
};