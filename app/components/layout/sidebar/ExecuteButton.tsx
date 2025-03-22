import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IProp {
   onExecute: () => void;
}
export default function ExecuteButton(props: IProp) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  
  return (
    <Card variant="highlighted" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
      
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
          onClick={() => {props.onExecute();}}
          
        >
          Execute
        </Button>
      </CardContent>
    </Card>
  );
}
