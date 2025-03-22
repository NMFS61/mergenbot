import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent, Typography } from '@mui/material';
import  CustomCard  from './ui/CustomCard';
export default function ColorCheckboxes() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
  <CustomCard title='Available Markets'>
      
    <Box sx={{ display: 'contents' }}>
      <FormControl sx={{ m: 5 }} component="fieldset" variant="standard">
      <FormLabel component="legend">STOCKS</FormLabel>
      <FormHelperText>USA</FormHelperText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="NASDAQ 100"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="NYSE 100"
          />
           <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="NYSE 200"
          />
          </FormGroup>
          
        <br/>
        <FormHelperText>UK</FormHelperText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="FTSE 100"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="FTSE 250"
          />
         
        </FormGroup>
        <br/>
        <FormHelperText>Turkiye</FormHelperText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="BIST 30"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="BIST 50"
          />
           <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="BIST 100"
          />
        </FormGroup>
        <br/>
        <FormLabel component="legend">FOREX</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="FOREX"
          />
          
        </FormGroup>
      </FormControl>

    </Box>
    </CustomCard>
  );
}
