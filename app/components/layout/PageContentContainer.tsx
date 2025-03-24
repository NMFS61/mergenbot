import React from "react";
import { alpha } from "@mui/material/styles";
import { Alert, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from '@mui/icons-material/Close';
import { I_Warning } from "@/app/interface/IComponents";
interface IProps {
    pageHeaderTitle?: string;
    warnings:I_Warning[];
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
                {/* Warnings area */}
                {props.warnings.length>0 &&
                    <Grid size={12}>
                        {props.warnings.map((a,ind)=>
                              <Alert key={ind} variant="outlined" icon={<CloseIcon fontSize="inherit" />} severity="warning">
                                {a.text}
                              </Alert>
                          )
                          
                          }

                    </Grid>
                }
                
                {props.children}
          
            </Grid>
        </Box>
      </Box>
    </Box>
  );
}
