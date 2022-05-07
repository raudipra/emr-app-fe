import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function PatientForm(props) {
  const [birthDate, setBirthDate] = React.useState(new Date('2022-05-06T21:11:54'));
  const [encounterType, setEncounterType] = React.useState("Inpatient");
  const [fname, setFname] = React.useState();
  const [lname, setLname] = React.useState();
  const [gender, setGender] = React.useState("Female");
  const [race, setRace] = React.useState();
  
  const handleDateChange = (newDate) => {
    setBirthDate(newDate);
  };

  const handleEncounterTypeChange = (newEncounterType) => {
    setEncounterType(newEncounterType.target.value);
  };

  const handleFnameChange = (newFname) => {
    setFname(newFname.target.value);
  };

  const handleLnameChange = (newLname) => {
    setLname(newLname.target.value);
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender.target.value);
  };

  const handleRaceChange = (newRace) => {
    setRace(newRace.target.value);
  };

  function register() {
    const patient = {
      f_name: fname,
      l_name: lname,
      birthdate: birthDate.toLocaleDateString('en-US'),
      gender: gender,
      race: race,
      encounter_type: encounterType
    };
    props.createPatient(patient)
  }
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Patient data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={fname}
            onChange={handleFnameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lname}
            onChange={handleLnameChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel id="gender-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Birthdate"
              inputFormat="MM/dd/yyyy"
              value={birthDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            labelId="encounterType"
            id="encounterType"
            value={encounterType}
            label="Encounter Type"
            onChange={handleEncounterTypeChange}
          >
            <MenuItem value={"Inpatient"}>Inpatient</MenuItem>
            <MenuItem value={"Outpatient"}>Outpatient</MenuItem>
            <MenuItem value={"Emergency"}>Emergency</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="race"
            name="race"
            label="Race"
            fullWidth
            value={race}
            onChange={handleRaceChange}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={register}
        sx={{ mt: 3, ml: 1 }}
      >
        Register
      </Button>
    </React.Fragment>
  );
}