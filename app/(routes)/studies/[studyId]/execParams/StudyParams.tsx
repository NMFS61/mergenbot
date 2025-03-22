import Study1Params from "./Study1Params";

interface IProp {
    studyId: string;
    updateExecutableState: (state: boolean) => void;
    updateParams: (params: any) => void;
}
export default function StudyParams(props: IProp) {
    return ( 
        <>
        {props.studyId=="1" && 
            <Study1Params onParamsUpdated={props.updateParams} onExecutableStateChange={props.updateExecutableState}/>
        }
        </>
     );
}

 