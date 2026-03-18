package com.danger.will.MedLink.api.service.services;

import java.util.List;

import com.danger.will.MedLink.api.model.PatientModel;

public interface PatientService {

    PatientModel addPatient(PatientModel patientModel);
    PatientModel getPatientById(long id);
    List<PatientModel> getAllPatient();
    PatientModel updatePatient(long id, PatientModel patientModel);
    Boolean deletePatient(long id);
    
}
