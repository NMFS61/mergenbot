'use server';
export default async function Page ({params}:{params:{orderId:string,agentId:string}}) {

    return ( <>Orders Page: {params.orderId},{params.agentId}</>  );
}

 