import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';  
  
/** Layouts **/  
import AuthLayout from "./layouts/authLayout";  
import DashboardLayout from "./layouts/dashboardLayout";  
  
/** Components **/  
import MetricPage from './pages/metricPage';  
import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage'; 
import PatientListPage from './pages/patientListPage'; 
import PatientDetailPage from './pages/patientDetailPage';
import CreatePatientPage from './pages/createPatientPage';

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/signin" element={(
                <AuthLayout>
                    <SignInPage />
                </AuthLayout>
            )} />
            <Route path="/signup" element={(
                <AuthLayout>
                    <SignUpPage />
                </AuthLayout>
            )} />
            <Route path="/metric" element={(
                <DashboardLayout>
                    <MetricPage />
                </DashboardLayout>
            )} />
            <Route path="/patients" element={(
                <DashboardLayout>
                    <PatientListPage />
                </DashboardLayout>
            )} />
            <Route path="/patients/:id" element={(
                <DashboardLayout>
                    <PatientDetailPage />
                </DashboardLayout>
            )} />
            <Route path="/patients/create" element={(
                <DashboardLayout>
                    <CreatePatientPage />
                </DashboardLayout>
            )} />
        </Routes>
    );
}

export default Router;