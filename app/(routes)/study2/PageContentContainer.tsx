import React from "react";
import { alpha } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface IProps {
    pageHeaderTitle?: string;
    children: React.ReactNode;
}
export default function PageContentContainer(props: IProps) {
  return (
    // Cover Box - main content , Margins, etc.
    <Box sx={{ display: "flex", flex: 1, marginRight: 2 }}>
        {/* Theme Box */}
      <Box component="main" sx={(theme) => ({ flexGrow: 1,
                                              backgroundColor: theme.vars
                                                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                                                : alpha(theme.palette.background.default, 1),
                                              overflow: "auto",
                                            })}
      >
        {/* Content box */}
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            {props.pageHeaderTitle &&
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                        {props.pageHeaderTitle}
                </Typography>
            }

            <Grid container spacing={2}  sx={{ mb: (theme) => theme.spacing(2) }}>
        
                {props.children}
            
            </Grid>
        </Box>
      </Box>
    </Box>
  );
}
