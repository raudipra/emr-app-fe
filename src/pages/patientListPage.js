import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TableData } from '../components';

export default function PatientListPage() {
    // Generate Order Data
    function createData(id, date, first, last, status) {
        return [id, date, first, last, status];
    }
    
    const rows = [
        createData(0, '20/10/2021', 'John', 'Smith', 'Green'),
        createData(1, '20/10/2021', 'Henrietta', 'Palacios', 'Yellow'),
        createData(2, '20/10/2021', 'Aviana', 'Denton', 'Green'),
        createData(3, '20/10/2021', 'Ameena', 'Carver', 'Red'),
        createData(4, '20/10/2021', 'Sana', 'Wilcox', 'Green'),
        createData(5, '20/10/2021', 'Kaleem', 'Davidson', 'Green'),
    ];
    const columns = ['ID', 'Date', 'First Name', 'Last Name', 'Patient Status'];
    const title = "Patient List"

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <TableData title={title} rows={rows} columns={columns} />
            </Paper>
        </Grid>
    );
}