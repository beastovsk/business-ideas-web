import {Header} from '@/components/Header/Header';
import {DynamicBreadcrumb} from '@/modules/UsageComponents/Breadcrumb/Breadcrumb';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      {children}
    </div>
  );
}
