package com.danger.will.MedLink.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danger.will.MedLink.api.model.PatientModel;
import com.danger.will.MedLink.api.service.implementation.PatientServiceImpl;
import com.danger.will.MedLink.api.service.services.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    PatientService patientService;

    PatientController(PatientServiceImpl patientServiceImpl){
        this.patientService = patientServiceImpl;
    }

    @PostMapping("/add")
    public PatientModel addPatient(@RequestBody PatientModel patientModel){
        return patientService.addPatient(patientModel);
    }

    @GetMapping("/{id}")
    public PatientModel getPatientById(@PathVariable long id){
        return patientService.getPatientById(id);
    }

    @GetMapping("/all")
    public List<PatientModel> getAllPatient(){
        return patientService.getAllPatient();
    }

    @PutMapping("/update/{id}")
    public PatientModel updatePatient(@PathVariable long id , @RequestBody PatientModel patientModel){
        return patientService.updatePatient(id, patientModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePatient(@PathVariable long id){
        if(patientService.deletePatient(id)){
            return "Patient of id: "+id+" has deleted";
        }else{
            return "Patient Id: "+id+" was not deleted or was not found";
        }
    }
}
