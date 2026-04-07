package com.danger.will.MedLink.api.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.danger.will.MedLink.api.entity.PatientEntity;
import com.danger.will.MedLink.api.entity.ReferralEntity;
import com.danger.will.MedLink.api.model.ReferralModel;
import com.danger.will.MedLink.api.repository.DoctorRepository;
import com.danger.will.MedLink.api.repository.HealthcareCenterRepository;
import com.danger.will.MedLink.api.repository.PatientRepository;
import com.danger.will.MedLink.api.repository.ReferralRepository;
import com.danger.will.MedLink.api.service.services.ReferralService;

@Service
public class ReferralServiceImpl implements ReferralService{

    ReferralRepository referralRepository;
    PatientRepository patientRepository;
    DoctorRepository doctorRepository;
    HealthcareCenterRepository healthcareCenterRepository;
    
    ReferralModel tempReferralModel = new ReferralModel();
    ReferralEntity referralEntity = new ReferralEntity();

    ReferralServiceImpl(ReferralRepository referralRepository,
                        PatientRepository patientRepository,
                        DoctorRepository doctorRepository,
                        HealthcareCenterRepository healthcareCenterRepository){

        this.referralRepository = referralRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.healthcareCenterRepository = healthcareCenterRepository;
    }


    @Override
    public ReferralModel addReferral(ReferralModel referralModel) {
        //copying id, diagnosis , status
        BeanUtils.copyProperties(referralModel, referralEntity);

        //manually adding patient entity in patient field of referral entity
        referralEntity.setPatient(patientRepository.findById(referralModel.getPatientId())
                                                   .orElseThrow(()->new RuntimeException(
                                                        "Patient not found for given patient id")));

        //manually adding healthcareCenter entity in healthcareCenter field of referral entity
        referralEntity.setHealthcareCenter(healthcareCenterRepository.findById(referralModel.getHealthcareCenterId())
                                                     .orElseThrow(()->new RuntimeException(
                                                        "HealthcareCenter not found for given healthcareCenter id"))); 

        //adding referring doctor
        referralEntity.setReferringDoctor(doctorRepository.findById(referralModel.getReferringDoctorId())
                                                          .orElseThrow(()->new RuntimeException(
                                                            "Referring doctor not found for given referring doctor id")));
        
        //adding receiving doctor
        referralEntity.setReceivingDoctor(doctorRepository.findById(referralModel.getReceivingDoctorId())
                                                          .orElseThrow(()->new RuntimeException(
                                                            "Referring doctor not found for given receiving doctor id")));

        //save
        referralRepository.save(referralEntity);
                    
        return referralModel;
    }

    @Override
    public ReferralModel getReferralById(long id) {
        //finding referral
        referralEntity = referralRepository.findById(id)
                                            .orElseThrow(()->new RuntimeException(
                                                "Referral not found for given referral id"));

        BeanUtils.copyProperties(referralEntity, tempReferralModel);

        //manually adding patient id to referral model
        //long but simple way
        PatientEntity patientEntity = referralEntity.getPatient();
        long patientId = patientEntity.getId();
        tempReferralModel.setPatientId(patientId);

        //short but complex
        //manually adding healthcareCenter id to referral model's field HealthcareCenterId
        tempReferralModel.setHealthcareCenterId(referralEntity.getHealthcareCenter().getId());

        //adding referring doctor
        tempReferralModel.setReferringDoctorId(referralEntity.getReferringDoctor().getId());

        //adding receiving doctor
        tempReferralModel.setReceivingDoctorId(referralEntity.getReceivingDoctor().getId());

        return tempReferralModel;
    }

    @Override
    public List<ReferralModel> getAllReferrals() {
        //getting all referrals
        List<ReferralEntity> referralEntities = referralRepository.findAll();

        //storage
        List<ReferralModel> referralModels = new ArrayList<>();

        for(ReferralEntity referralEntity : referralEntities){
            ReferralModel tempReferralModel2 = new ReferralModel();          //temp storage
            BeanUtils.copyProperties(referralEntity, tempReferralModel2);    //copying mainly id,diagnosis,status

            //copying other fields mainly foreign keys
            tempReferralModel2.setPatientId(referralEntity.getPatient().getId());
            tempReferralModel2.setHealthcareCenterId(referralEntity.getHealthcareCenter().getId());
            tempReferralModel2.setReferringDoctorId(referralEntity.getReferringDoctor().getId());
            tempReferralModel2.setReceivingDoctorId(referralEntity.getReceivingDoctor().getId());

            //adding into list
            referralModels.add(tempReferralModel2);
        }
        
        return referralModels;
    }

    @Override
    public String updateReferralStatus(long id, String status) {
        //getting the particular entity of input id
        referralEntity =  referralRepository.findById(id)
                                            .orElseThrow(()->new RuntimeException(
                                                "Referral for given id not found"));

        //updating status only
        referralEntity.setStatus(status);

        referralRepository.save(referralEntity);
        return "Status of Referral id: "+id+" has been changed to: "+referralEntity.getStatus();
    }

    @Override
    public ReferralModel updateReferral(long id , ReferralModel referralModel){
        referralEntity = referralRepository.findById(id)
                                            .orElseThrow(()->new RuntimeException(
                                                "Referral not found for given id"));

        //copying properties
        BeanUtils.copyProperties(referralModel, referralEntity);

        //manually adding patient
        referralEntity.setPatient(patientRepository.findById(referralModel.getPatientId())
                                                    .orElseThrow(()->new RuntimeException(
                                                        "Referral not found for given id")));

        //manually adding healthcareCenter
        referralEntity.setHealthcareCenter(healthcareCenterRepository.findById(referralModel.getHealthcareCenterId())
                                                     .orElseThrow(()->new RuntimeException(
                                                        "Referral not found for given id")));

        //manually adding referring doctor
        referralEntity.setReferringDoctor(doctorRepository.findById(referralModel.getReferringDoctorId())
                                                          .orElseThrow(()->new RuntimeException(
                                                            "Referral not found for given id")));

        //manually adding receiving doctor
        referralEntity.setReceivingDoctor(doctorRepository.findById(referralModel.getReceivingDoctorId())
                                                          .orElseThrow(()->new RuntimeException(
                                                            "Referral not found for given id")));

        referralRepository.save(referralEntity);

        return referralModel;
    }

    @Override
    public Boolean deleteReferral(long id) {
        if(referralRepository.existsById(id)){
            referralRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
    
}