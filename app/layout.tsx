import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Providers } from '@/app/_GlobalRedux/provider';
import { Suspense } from "react";
// import { SessionProvider, signIn, signOut } from 'next-auth/react';
import theme from '@/theme/theme';
// import { auth } from '../auth';
// will not be used, display purposes
const NAVIGATION: Navigation = [{kind: 'header', title: 'Main items',},
                                {title: 'Dashboard', icon: <DashboardIcon />,},
                                {segment: 'orders',title: 'Orders',icon: <ShoppingCartIcon />,},];

// const AUTHENTICATION = {signIn,signOut,};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const session = await auth();
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        {/* <SessionProvider session={session}> */}
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              theme={theme}
              navigation={NAVIGATION}
              branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'Mergen',
                homeUrl: '/toolpad/core/introduction',
              }}
              // session={session}
              // authentication={AUTHENTICATION}
            >
               <Providers>
    <DashboardLayout hideNavigation>
      {/* <PageContainer> */}
             {children}
        {/* <Copyright sx={{ my: 4 }} />
      </PageContainer> */}
    </DashboardLayout>
    </Providers>
             
            </NextAppProvider>
          </AppRouterCacheProvider>
          </Suspense>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
