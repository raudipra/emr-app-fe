import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chart, Counter, TableData } from '../components';

export default function MetricPage() {
    // Generate Order Data
    function createData(id, date, name, branch, paymentMethod, amount) {
        return [id, date, name, branch, paymentMethod, amount];
    }
    
    const rows = [
        createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', '$312.44'),
        createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', '$866.99'),
        createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', '$100.81'),
        createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', '$654.39'),
        createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '$212.79'),
    ];
    const columns = ['ID', 'Date', 'Name', 'Branch', 'Payment Method', 'Sale Amount'];
    const title = "Transaction"

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
                >
                <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
                >
                <Counter />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <TableData title={title} rows={rows} columns={columns} />
                </Paper>
            </Grid>
        </Grid>
    );
  }