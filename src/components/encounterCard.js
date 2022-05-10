import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EncounterCard(props) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    {props.medicalRecords.map((medicalRecord, index) => (
                        <div key={index}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Medical Info
                                </Typography>
                                <Typography variant="body2">
                                    Type: {medicalRecord.type}
                                    <br />
                                    {props.result !== null && (
                                        <>
                                            Result: {medicalRecord.result}
                                        <br /></>
                                    )}
                                    Admitted: {new Date(medicalRecord.start_date).toLocaleDateString("en-US")}
                                    <br />
                                    Discharged: {medicalRecord.end_date}
                                    <br />
                                </Typography>
                            </CardContent>
                        </div>
                    ))}
                </React.Fragment>
            </Card>
        </Box>
    );
}
