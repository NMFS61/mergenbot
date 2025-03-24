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
    title: string;
    studyID?: string;
    description: string;
    interval: "Intraday" | "Day" | "Long term" ;
}
export default function StudyDescriptionCard({ title, studyID, description, interval }: IProp) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const handleClick = () => {router.push(`/studies/${studyID}`)};
  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardContent>
      <Chip label={interval} color="primary" variant="outlined" />
      <br /><br />
        <Typography component="h2" variant="subtitle2" gutterBottom sx={{ fontWeight: '600' }}>
            {title}
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
          onClick={() => {handleClick();}}
        >
          start
        </Button>
      </CardContent>
    </Card>
  );
}
