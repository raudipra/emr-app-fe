import * as React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chart, Counter } from '../components';

export default function MetricPage() {
    const [totalCovid, setTotalCovid] = React.useState(-1);
    const [currentCovid, setCurrentCovid] = React.useState(-1);
    const [currentAdmit, setCurrentAdmit] = React.useState(-1);
    const [encType, setEncType] = React.useState([]);
    const [admittedEncType, setAdmittedEncType] = React.useState([]);

    React.useEffect(() => {
        const getMetrics = () => {
            axios.get(`https://ckvy8eecxk.execute-api.us-east-1.amazonaws.com/dev/metrics`)
                .then(res => {
                    const data = res.data;
                    setCurrentAdmit(data.metrics.current_admits)
                    setTotalCovid(data.metrics.total_covid_cases)
                    setCurrentCovid(data.metrics.current_covid_cases)
                    let tempEncType = []
                    Object.keys(data.metrics.enc_types).forEach(function(key) {
                        tempEncType.push({name: key, number_of_patient: data.metrics.enc_types[key]})
                    })
                    setEncType(tempEncType)
                    let tempAdmittedEncType = []
                    Object.keys(data.metrics.admitted_enc_types).forEach(function(key) {
                        tempAdmittedEncType.push({name: key, number_of_patient: data.metrics.admitted_enc_types[key]})
                    })
                    setAdmittedEncType(tempAdmittedEncType)
                })
                .catch((error) => {
                    // Error
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the 
                        // browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
        getMetrics()
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Counter title="Current Admits" val={currentAdmit}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Counter title="Current COVID Case" val={currentCovid}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Counter title="Total COVID Case" val={totalCovid}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
                >
                <Chart title="Patient by Encounter Type" data={encType}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
                >
                <Chart title="Admitted Patient by Encounter Type" data={admittedEncType}/>
                </Paper>
            </Grid>
        </Grid>
    );
  }