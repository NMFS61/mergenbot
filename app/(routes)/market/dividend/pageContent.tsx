'use client';
import DividendSummaryGrid, { IGroupDivStats } from "@/app/components/ui/grids/DividendSummaryGrid";
import { TickerDivData } from "@/app/interface/tickerInfo";
interface IProps {
    results:IGroupDivStats[];
}

function PageContent(props:IProps) {
    return (  
        <DividendSummaryGrid results={props.results} />
    );
}

export default PageContent;