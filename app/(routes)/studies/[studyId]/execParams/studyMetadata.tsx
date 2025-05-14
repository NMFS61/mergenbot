export const getFirstStudyParams = (studyId:string) => {
    if(studyId=="1"){return {"dropByPC":50,"increaseTargetPC":50}}
    if(studyId=="2"){return {"dropByPC":50,"increaseTargetPC":50,"shorterVolatilityPC":3}}
    return {};
}

export const getStudyDescription = (studyId:string):React.ReactNode => {
    if(studyId=="1"){
        return <>
                 In this study, we will analyse the effect of dropping a certain percentage of stocks and it's increase back to certain percentage increase.
               </>
    }
    if(studyId=="2"){
        return <>
         In this study, we will analyse the shortlisted stocks in study1 for further analysis to see shorter volatility.
                 
               </>
    }
    if(studyId=="3"){
        return <>
                 In this study, we will analyse the rise or drop in short span of time.
               </>
    }
    if(studyId=="4"){
        return <>
                 In this study, we will analyse the rise or drop in short span of time.
               </>
    }
    return <></>;
}