import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';
import { DashboardLayout, PageContainer } from '@toolpad/core';
import Copyright from './components/Copyright';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];



export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const session = await auth();
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <React.Suspense fallback={<div>Loading...</div>}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              theme={theme}
              navigation={NAVIGATION}
              branding={{
                logo:<img src="https://mui.com/static/logo.png"/>,
                title:'Mergen Bot',
                homeUrl:'/'
              }}
              // session={session}
              // authentication={AUTHENTICATION}
            >
                  <DashboardLayout hideNavigation>
                    <PageContainer>
                      {children}
                      <Copyright sx={{ my: 4 }} />
                    </PageContainer>
                  </DashboardLayout>
            </NextAppProvider>
          </AppRouterCacheProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
