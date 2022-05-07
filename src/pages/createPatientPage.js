import * as React from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PatientForm } from '../components';

const theme = createTheme();

export default function CreatePatientPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [status, setStatus] = React.useState(false);

  const handleNext = (patient) => {
    axios.put(`https://ckvy8eecxk.execute-api.us-east-1.amazonaws.com/dev/create_patient`, patient)
      .then(res => {
        setStatus(true);
        setActiveStep(activeStep + 1);
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
        setActiveStep(activeStep + 1);
    });
  };

  const steps = ['Patient Form'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PatientForm createPatient={handleNext}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleBack = () => {
    setStatus(false);
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Patient Registration
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {status ? (
                  <Typography variant="h5" gutterBottom>
                    Registration is completed.
                  </Typography>
                ) : (
                  <Typography variant="h5" gutterBottom>
                    Registration is failed.
                  </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}