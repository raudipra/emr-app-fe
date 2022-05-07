import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfileCard(props) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    {props.profiles.map((profile) => (
                        <div key={profile.person_id}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Patient Info
                                </Typography>
                                <Typography variant="body2">
                                    Patient ID: {profile.person_id}
                                    <br />
                                    Name: {profile.first_name} {profile.last_name}
                                    <br />
                                    Birth Date: {new Date(profile.birth_datetime).toLocaleDateString("en-US")}
                                    <br />
                                    Gender: {profile.gender_source_value}
                                </Typography>
                            </CardContent>
                        </div>
                    ))}
                </React.Fragment>
            </Card>
        </Box>
    );
}
