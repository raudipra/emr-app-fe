import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './title';

export default function Counter(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography m={4} component="p" variant="h3">
        {props.val}
      </Typography>
    </React.Fragment>
  );
}