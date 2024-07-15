import {Navigation} from '@/modules/Settings/Navigation/Navigation';
import {Profile} from '@/modules/Settings/Profile/Profile';
import {DynamicBreadcrumb} from '@/modules/UsageComponents/Breadcrumb/Breadcrumb';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
      <DynamicBreadcrumb />

      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Настройки</h1>
      </div>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <Navigation />
        {children}
      </div>
    </main>
  );
}
