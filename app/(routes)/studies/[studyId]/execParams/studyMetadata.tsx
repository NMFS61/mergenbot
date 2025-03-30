export const getFirstStudyParams = (studyId:string) => {
    if(studyId=="1"){return {"dropByPC":50,"increaseTargetPC":50}}
    return {};
}

export const getStudyDescription = (studyId:string):React.ReactNode => {
    if(studyId=="1"){
        return <>
                 In this study, we will analyse the effect of dropping a certain percentage of stocks and it's increase back to certain percentage increase.
               </>
    }
    return <></>;
}