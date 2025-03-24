import { I_CollectedPosition,I_EvaluatedPosition, I_Study } from "../IExecution";
import { I_TickerRow } from "../ITickerData";

class Study1Sample implements I_Study {
     collect= (studyParams:any,rows:I_TickerRow[]) => {return [] as I_CollectedPosition[]};
     eval= (ticker:string,positionRows: I_CollectedPosition[],studyParams:any,rows: I_TickerRow[]) => {return [] as I_EvaluatedPosition[]};
}