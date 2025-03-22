import * as React from 'react';
import PageContent from './pageContent';



export default function Page({params}: { params: { studyId: string };}) {
  return <PageContent studyID={params.studyId}/>;
}
