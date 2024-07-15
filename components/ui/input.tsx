'use client';

import * as React from 'react';
import {cn} from '@/lib/utils';
import {Eye, EyeOff} from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, ...props}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isPasswordType = type === 'password';

  return (
    <div className='relative w-full sm:w-inherit'>
      <input
        type={isPasswordType && showPassword ? 'text' : type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {isPasswordType && (
        <button
          type='button'
          onClick={toggleShowPassword}
          className='absolute inset-y-0 right-0 flex items-center px-3 text-sm'
        >
          {showPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
        </button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export {Input};
