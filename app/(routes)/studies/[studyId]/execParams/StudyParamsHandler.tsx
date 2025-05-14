import Study1Params from "./params/Study1Params";
import Study2Params from "./params/Study2Params";

interface IProp {
    studyId: string;
    updateWarnings: (warnings: []) => void;
    updateParams: (params: any) => void;
}

export default function StudyParams(props: IProp) {
    return ( 
        <>
        {props.studyId=="1" && 
            <Study1Params onParamsUpdated={props.updateParams} 
                          onParamWarningsChange={props.updateWarnings} 
                           />
        }
        {props.studyId=="2" && 
            <Study2Params onParamsUpdated={props.updateParams} 
                          onParamWarningsChange={props.updateWarnings} 
                           />
        }
        </>
     );
}

 