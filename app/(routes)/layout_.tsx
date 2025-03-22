import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Providers } from '@/app/_GlobalRedux/provider';
export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Providers>
    <DashboardLayout hideNavigation
      // slots={{
      //   toolbarAccount: ToolbarAccountOverride,
      //   sidebarFooter: SidebarFooterAccount,
      // }}
    >
      {/* <PageContainer> */}
        {props.children}
        {/* <Copyright sx={{ my: 4 }} />
      </PageContainer> */}
    </DashboardLayout>
    </Providers>
  );
}
