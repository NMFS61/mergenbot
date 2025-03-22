import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.error.main,
    (theme.vars || theme).palette.primary.light,
  ];
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Success/Fail numbers
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            
            
          </Stack>
          
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.6,
                data: ['BIST 30', 'BIST 50', 'BIST 100', 'FTSE 100', 'FTSE 250', 'NASDAQ 100', 'NYSE 100', 'NYSE 200'],
              },
            ] as any
          }
          series={[
            {
              id: 'page-views',
              label: 'Sucess',
              data: [100, 101, 102, 90, 104, 200, 123, 85],
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Fail',
              data: [30, 42, 23, 21, 47, 35, 23, 20],
              stack: 'A',
            },
      
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
