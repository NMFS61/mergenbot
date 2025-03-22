'use client';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';



function MainLayout(props: Readonly<{ children: React.ReactNode }>) {

    return ( 
        <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        {props.children}
        </Box>
     );
}

export default MainLayout;