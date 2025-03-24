import fs from 'fs';
const root=process.cwd()+"/data";
import { TickerDivData, TickerSplitData } from '../interface/ITickerExtra';
import { I_TickerRow } from '../interface/ITickerData';

export const readCSVSync =(ticker:string,exchange:string,timeFrame:"D1"|"W1"|"M1"):I_TickerRow[]=>{
    const rows = [];
    const path=root+"/"+exchange+"/"+ticker+"_"+timeFrame+".csv";
    fs.readFileSync(path, 'utf8').split('\n').forEach((row, index) => {
        if (index === 0) return;
        const [dt, Open, High, Low, Close, Volume, Change] = row.split(',');
        if(dt&&Open&&High&&Low&&Close&&Volume){ 
            rows.push(
                {'date': new Date(dt),
                    'open': parseFloat(Open),
                    'high': parseFloat(High),
                    'low': parseFloat(Low),
                    'close': parseFloat(Close),
                    'volume': parseFloat(Volume)
                    } as I_TickerRow
            );
     }
    });
    return rows;
}

export const readCSVSync_Div =(ticker:string,exchange:string):TickerDivData[]=>{
    const rows = [];
    const path=root+"/"+exchange+"/DIVIDENDS/"+ticker+"_Divs"+".csv";
    try{
        fs.readFileSync(path, 'utf8').split('\n').forEach((row, index) => {
            if (index === 0) return;
            if (row.trim()=='') return;
            const [dt, val, currency] = row.split(',');
            rows.push(
                {"date":new Date(dt),
                    "div":parseFloat(val),
                    "currency":currency
                    } as TickerDivData
            );
        });
    }catch{}
    return rows;
}

export const readCSVSync_Split =(ticker:string,exchange:string):TickerSplitData[]=>{
    const rows = [];
    const path=root+"/"+exchange+"/SPLITS/"+ticker+"_Splits"+".csv";
    try{
        fs.readFileSync(path, 'utf8').split('\n').forEach((row, index) => 
            {
                if (index === 0) return;
                if (row.trim()=='') return;
                const [dt,split] = row.split(',');
                const splitStr=split.replace("/",":");
                
                const splitNums=splitStr.split(":") as string[];
                const f=Number.parseFloat(splitNums[0])/Number.parseFloat(splitNums[1])
                rows.push(
                    {'date': new Date(dt),
                        'split':splitStr,
                        'multiplyFactor':f});
            });
        }catch{}
    return rows;
}

export function getTopN(rows, filterField, n) {
    // clone before sorting, to preserve the original array
    var clone = rows.slice(0); 

    // sort descending
    clone.sort(function(x, y) {
        if (x[filterField] == y[filterField]) return 0;
        else if (parseInt(x[filterField]) < parseInt(y[filterField])) return 1;
        else return -1;
    });

    return clone.slice(0, n || 1);
}