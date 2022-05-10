import * as React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TableData } from '../components';

export default function PatientListPage() {
    const [rows, setRows] = React.useState([]);

    // Generate Order Data
    function createData(id, birthdate, first, last, dischargeDate) {
        var date = ""
        if (dischargeDate){
            date = new Date(dischargeDate).toLocaleDateString('en-US')
        }
        return [id, new Date(birthdate).toLocaleDateString('en-US'), first, last, date];
    }

    React.useEffect(() => {
        const getPatientList = () => {
            axios.get(`https://ckvy8eecxk.execute-api.us-east-1.amazonaws.com/dev/patient`)
                .then(res => {
                    const data = JSON.parse(res.data.body);
                    let patients = []
                    data.forEach((patient) => {
                        patients.push(createData(patient.person_id, patient.birth_datetime, 
                            patient.first_name, patient.last_name, patient.c_id))
                        }    
                    )
                    setRows(patients)
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
        getPatientList()
    }, []);
    
    const columns = ['ID', 'Birth Date', 'First Name', 'Last Name', 'Last Discharge'];
    const title = "Patient List"

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <TableData title={title} rows={rows} columns={columns} />
            </Paper>
        </Grid>
    );
}