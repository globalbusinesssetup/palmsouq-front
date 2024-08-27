"use client"
import { Header, TopBar } from '@/components';
import { usePathname } from 'next/navigation';
import * as React from 'react';


export default function MainLayout({children}:{children:React.ReactNode}) {
    const pathname = usePathname();
    console.log("path_name: ", pathname);
    return (
        <main>
            <TopBar />
            {
                !pathname.includes('dashboard') &&
                <Header showSearch />
            }
            {children}
        </main>
    )
};