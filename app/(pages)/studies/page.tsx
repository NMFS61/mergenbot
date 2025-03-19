import PageClient from "./pageClient";
export interface I_Study_Description{
    name:string;
    description:string;
    url:string;
}
const studies=[
    {"name":"Study1","description":"Volatility analysys 1","url":"studies/study1"},
    {"name":"Study2","description":"Volatility analysys 2","url":"studies/study2"}
] as I_Study_Description[];

function Page() {
    
    return (<PageClient studyList={studies}/>  );
}

export default Page;