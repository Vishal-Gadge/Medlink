package com.danger.will.MedLink.api.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.danger.will.MedLink.api.entity.DoctorEntity;
import com.danger.will.MedLink.api.entity.HealthcareCenterEntity;
import com.danger.will.MedLink.api.model.DoctorModel;
import com.danger.will.MedLink.api.repository.DoctorRepository;
import com.danger.will.MedLink.api.repository.HealthcareCenterRepository;
import com.danger.will.MedLink.api.service.services.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService{

    DoctorRepository doctorRepository;
    HealthcareCenterRepository healthcareCenterRepository;

    DoctorServiceImpl(DoctorRepository doctorRepository , HealthcareCenterRepository healthcareCenterRepository){
        this.doctorRepository = doctorRepository;
        this.healthcareCenterRepository = healthcareCenterRepository;
    }

    @Override
    public DoctorModel addDoctor(DoctorModel doctorModel) {
        DoctorEntity doctorEntity = new DoctorEntity();           //instance creation
        BeanUtils.copyProperties(doctorModel, doctorEntity);      //coping properties

        HealthcareCenterEntity healthcareCenterEntity = 
            healthcareCenterRepository.findById(doctorModel.getHealthcareCenterId()).get();  //getting the healthcareCenter entity
        
        doctorEntity.setHealthcareCenter(healthcareCenterEntity);                 //adding healthcareCenter object at doctorEntity

        doctorRepository.save(doctorEntity);                      //saving in database
        return doctorModel;
    }

    @Override
    public List<DoctorModel> getAllDoctors() {
        List<DoctorEntity> doctorEntities = doctorRepository.findAll();   //getting from db
        List<DoctorModel> doctorModel = new ArrayList<>();                //storage

        for(DoctorEntity doctorEntity : doctorEntities) {                   //to copy properties in list
            DoctorModel tempModel = new DoctorModel();                      //storage
            BeanUtils.copyProperties(doctorEntity, tempModel);              //copying

            tempModel.setHealthcareCenterId(doctorEntity.getHealthcareCenter().getId());    //manually adding healthcareCenter id to model

            doctorModel.add(tempModel);                                     //add
        }

        return doctorModel;
    }

    @Override
    public DoctorModel getDoctorById(long id) {
        DoctorEntity doctorEntity =                                 //getting the doctor entity
            doctorRepository.findById(id)                                        
                            .orElseThrow(()->new RuntimeException("HealthcareCenter not found"));
        
        DoctorModel doctorModel = new DoctorModel();                //storage

        BeanUtils.copyProperties(doctorEntity, doctorModel);        //coping

        //manually getting the healthcareCenter as it is foreign key and adding in model
        doctorModel.setHealthcareCenterId(doctorEntity.getHealthcareCenter().getId());     

        return doctorModel;
    }

    @Override
    public DoctorModel updateDoctor(long id, DoctorModel doctorModel) {
        DoctorEntity doctorEntity = 
                doctorRepository.findById(id)
                                .orElseThrow(()->new RuntimeException("Record not found"));

        BeanUtils.copyProperties(doctorModel, doctorEntity);

        //manually adding healthcareCenter entity to doctor entity's healthcareCenter field as we have set it foreign key
        doctorEntity.setHealthcareCenter(healthcareCenterRepository.findById(doctorModel.getHealthcareCenterId())          
                                                    .orElseThrow(()->new RuntimeException()));    

        doctorRepository.save(doctorEntity);
        
        return doctorModel;
    }

    @Override
    public Boolean deleteDoctor(long id) {
        if (doctorRepository.existsById(id)) {       //checking if exixts
            doctorRepository.deleteById(id);
            return true; 
        }
        return false;
    } 
}
