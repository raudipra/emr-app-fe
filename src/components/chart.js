import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar } from 'recharts';
import Title from './title';

export default function Chart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>                     
        <BarChart data={props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="number_of_patient" fill={theme.palette.primary.main}/>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}