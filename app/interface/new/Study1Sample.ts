import { I_CollectedPosition,I_EvaluatedPosition, I_Study } from "./IExecution";

class Study1Sample implements I_Study {
     collect= () => {return [] as I_CollectedPosition[]};
     eval= () => {return [] as I_EvaluatedPosition[]};
}