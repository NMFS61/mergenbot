'use client';
import { useEffect, useState } from "react";

export default function PageClient() {
    const [age,setAge]=useState(10);
        useEffect(()=>{
            setAge(1);
        })
    return (<>{age}</>  );
}
