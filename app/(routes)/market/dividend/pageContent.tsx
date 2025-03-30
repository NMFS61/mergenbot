'use client';
import MainLayout from "@/app/components/layout/MainLayout";
import PageContentContainer from "@/app/components/layout/PageContentContainer";
import SidebarHome from "@/app/components/layout/sidebar/SidebarHome";
import DividendSummaryGrid, { IGroupDivStats } from "@/app/components/ui/grids/DividendSummaryGrid";
import { TickerDivData } from "@/app/interface/ITickerExtra";
import Grid from "@mui/material/Grid2";

interface IProps {
    results:IGroupDivStats[];
}

function PageContent(props:IProps) {
    return (  

<MainLayout inProgress={false}>
     {/*  Sidebar */}
     <Grid size={2}>
         <SidebarHome />
      </Grid>
     {/*  Page Content */}
     <Grid size={10}>
        <PageContentContainer pageHeaderTitle="Dividend stats(All markets)" warnings={[]}>
            {/* ROW 1 :Results */}
           <DividendSummaryGrid results={props.results} />
        </PageContentContainer>
    </Grid>
    
</MainLayout>
        
    );
}

export default PageContent;