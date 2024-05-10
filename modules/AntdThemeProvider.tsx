'use client';
import React, {useEffect, useState} from 'react';
import {ConfigProvider} from 'antd';
import locale from 'antd/locale/ru_RU';
import {darkTheme, lightTheme} from '@/src/helpers/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {useMutation} from 'react-query';
import {GetUser} from './Marketplace/api';
import {usePathname, useRouter} from 'next/navigation';
import {deleteCookie} from 'cookies-next';
import io from 'socket.io-client';
import {customNotification} from '@/src/helpers/customNotification';
import Btn from '@/components/UI/Btn/Btn';

dayjs.locale('ru');
// @ts-ignore
const socket = io.connect('http://localhost:3001');

function AntdThemeProvider({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    socket.on('emit_name', (data) => {
      return data
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider locale={locale} theme={darkTheme}>
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
