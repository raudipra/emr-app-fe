import * as React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { TableMedicalData, EncounterCard, ProfileCard } from '../components';
import { useParams } from "react-router";

export default function PatientDetailPage() {
    const [rows, setRows] = React.useState([]);
    const [profile, setProfile] = React.useState([]);
    const [medicalRecord, setMedicalRecord] = React.useState([]);
    const [encounterID, setEncounterID] = React.useState(-1);
    const [reason, setReason] = React.useState("");
    const { id } = useParams();
        
    // Generate Order Data
    function createData(enc_id, start_date, category, type, result, end_date) {
        return [enc_id, new Date(start_date).toLocaleDateString('en-US'), category, type, result, end_date];
    }

    const handleReasonChange = (newReason) => {
        setReason(newReason.target.value);
    };

    function handleClick(props) {
        let tempMedicalRecord = {
            start_date: props[1],
            category: props[2],
            type: props[3],
            result: props[4],
            end_date: props[5]
        }
        setReason("")
        setEncounterID(props[0])
        setMedicalRecord([tempMedicalRecord]);
    }

    function discharge() {
        const info = {
            reason: reason,
            enc: encounterID,
        }
        axios.put(`https://ckvy8eecxk.execute-api.us-east-1.amazonaws.com/dev/discharge_patient`, info)
            .then(res => {
                console.log(res.data.body)
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
    };
    
    
    React.useEffect(() => {
        const getMedicalRecords = () => {
            axios.post(`https://ckvy8eecxk.execute-api.us-east-1.amazonaws.com/dev/patient_detail`, { patient_id: id })
                .then(res => {
                    const data = JSON.parse(res.data.body);
                    let tempRows = []
                    data.medical_records.forEach((mr) => {
                        tempRows.push(createData(mr.enc_id, mr.start_date, mr.category, 
                            mr.type, mr.result, mr.end_date))
                        }
                    )
                    setProfile([data.person])
                    setRows(tempRows)
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
        getMedicalRecords()
    }, [id]);
    
    const columns = ['Encounter ID', 'Date', 'Category', 'Type', 'Result'];
    const title = "Medical Records"

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <ProfileCard profiles={profile} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <EncounterCard medicalRecords={medicalRecord} />
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <TableMedicalData title={title} rows={rows} columns={columns} handler={handleClick} />
                </Paper>
            </Grid>
            {encounterID !== -1 && (
                <><Grid item xs={12}>
                    <TextField
                        required
                        id="reason"
                        name="reason"
                        label="reason"
                        fullWidth
                        value={reason}
                        onChange={handleReasonChange}
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={discharge} variant="contained" sx={{ mt: 3, ml: 1 }}>
                        Discharge
                    </Button>
                </Grid></>
            )}
        </Grid>
    );   
}