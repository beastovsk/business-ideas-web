'use client';

import React from 'react';
import {ThemeProvider} from 'next-themes';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Toaster} from '@/components/ui/toaster';
import {ThemeButton} from '@/components/ThemeButton/ThemeButton';

function ClientProvider({children}: {children: React.ReactNode}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
        <ThemeButton />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default ClientProvider;
