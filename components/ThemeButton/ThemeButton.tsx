'use client';

import * as React from 'react';
import {MoonIcon, SunIcon} from '@radix-ui/react-icons';
import {useTheme} from 'next-themes';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

export function ThemeButton() {
  const {theme, setTheme} = useTheme();

  const handleChangeTheme = () => {
    if (theme === 'dark') {
      return setTheme('light');
    }
    setTheme('dark');
  };

  return (
    <div className='fixed right-4 bottom-4 md:right-8 md:bottom-8'>
      <Button variant='outline' size='icon' onClick={handleChangeTheme}>
        <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </div>
  );
}
