import { Backdrop, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Children } from "react";
interface IProp{
    inProgress:boolean;
    children: React.ReactNode;
}
export default function MainLayout(props:IProp) {
    return (
<Grid container spacing={1}>
    <Grid size={12} /> {/*  For spacing */}

    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} 
                open={props.inProgress}
                onClick={()=>{}}>
        <CircularProgress color="inherit" />
    </Backdrop>
    
      {props.children}
</Grid>
    );
}