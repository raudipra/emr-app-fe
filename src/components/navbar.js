import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/patients/create">
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Register Patient" />
    </ListItemButton>
    <ListItemButton component={Link} to="/patients">
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Patient List" />
    </ListItemButton>
    <ListItemButton component={Link} to="/metric">
        <ListItemIcon>
            <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Metrics" />
    </ListItemButton>
  </React.Fragment>
);