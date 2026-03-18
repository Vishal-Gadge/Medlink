package com.danger.will.MedLink.api.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.danger.will.MedLink.api.entity.PatientEntity;
import com.danger.will.MedLink.api.model.PatientModel;
import com.danger.will.MedLink.api.repository.PatientRepository;
import com.danger.will.MedLink.api.service.services.PatientService;

@Service
public class PatientServiceImpl implements PatientService{

    PatientRepository patientRepository;

    PatientServiceImpl(PatientRepository patientRepository){
        this.patientRepository = patientRepository;
    }

    @Override
    public PatientModel addPatient(PatientModel patientModel) {
        PatientEntity patientEntity = new PatientEntity();
        //first way
        BeanUtils.copyProperties(patientModel, patientEntity);

        //second way
        // patientEntity.setId(patientModel.getId());
        // patientEntity.setUsername(patientModel.getUsername());
        // patientEntity.setContactNumber(patientModel.getContactNumber());
        // patientEntity.setDateOfBirth(patientModel.getDateOfBirth());
        // patientEntity.setGender(patientModel.getGender());

        patientRepository.save(patientEntity);
        return patientModel;
    }

    @Override
    public PatientModel getPatientById(long id) {
        PatientEntity patientEntity = 
            patientRepository.findById(id)
                             .orElseThrow(()->new RuntimeException("Record not found"));
            
        PatientModel patientModel = new PatientModel();
        BeanUtils.copyProperties(patientEntity, patientModel);
        return patientModel;
    }

    @Override
    public List<PatientModel> getAllPatient() {
        List<PatientEntity> patientEntities = patientRepository.findAll();
        List<PatientModel> patientModels = new ArrayList<>();

        for(PatientEntity patientEntity : patientEntities){
            PatientModel patientModel = new PatientModel();
            BeanUtils.copyProperties(patientEntity, patientModel);
            patientModels.add(patientModel);
        }

        return patientModels;
    }

    @Override
    public PatientModel updatePatient(long id, PatientModel patientModel) {
        PatientEntity patientEntity = 
                        patientRepository.findById(id)
                                         .orElseThrow(()->new RuntimeException("Record not found"));

        BeanUtils.copyProperties(patientModel, patientEntity);
        patientRepository.save(patientEntity);

        return patientModel;
    }

    @Override
    public Boolean deletePatient(long id) {
        if(patientRepository.existsById(id)){
            patientRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}