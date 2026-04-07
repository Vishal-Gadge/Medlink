package com.danger.will.MedLink.api.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.danger.will.MedLink.api.entity.HealthcareCenterEntity;
import com.danger.will.MedLink.api.model.HealthcareCenterModel;
import com.danger.will.MedLink.api.repository.HealthcareCenterRepository;
import com.danger.will.MedLink.api.service.services.HealthcareCenterService;

@Service
public class HealthcareCenterServiceImpl implements HealthcareCenterService{

    HealthcareCenterRepository healthcareCenterRepository;
    HealthcareCenterEntity healthcareCenterEntity = new HealthcareCenterEntity();
    HealthcareCenterModel healthcareCenterModel = new HealthcareCenterModel();

    HealthcareCenterServiceImpl(HealthcareCenterRepository healthcareCenterRepository){
        this.healthcareCenterRepository = healthcareCenterRepository;
    }

    @Override
    public HealthcareCenterModel addHealthcareCenter(HealthcareCenterModel healthcareCenterModel) {
        BeanUtils.copyProperties(healthcareCenterModel, healthcareCenterEntity);
        healthcareCenterRepository.save(healthcareCenterEntity);
        return healthcareCenterModel;
    }

    @Override
    public HealthcareCenterModel getHealthcareCenterById(long id) {
        healthcareCenterEntity = healthcareCenterRepository.findById(id)
                                           .orElseThrow(()->new RuntimeException("Record not found"));
        
        BeanUtils.copyProperties(healthcareCenterEntity, healthcareCenterModel);
        return healthcareCenterModel;
    }

    @Override
    public List<HealthcareCenterModel> getAllFacilities() {
        List<HealthcareCenterEntity> healthcareCenterEntities = healthcareCenterRepository.findAll();
        List<HealthcareCenterModel> healthcareCenterModels = new ArrayList<>();

        for(HealthcareCenterEntity healthcareCenterEntity : healthcareCenterEntities){
            HealthcareCenterModel tempHealthcareCenterModel = new HealthcareCenterModel();
            BeanUtils.copyProperties(healthcareCenterEntity, tempHealthcareCenterModel);
            healthcareCenterModels.add(tempHealthcareCenterModel);
        }

        return healthcareCenterModels;
    }

    @Override
    public HealthcareCenterModel updateHealthcareCenter(long id, HealthcareCenterModel healthcareCenterModel) {
        healthcareCenterEntity = healthcareCenterRepository.findById(id)
                                           .orElseThrow(()->new RuntimeException("Record not found"));

        BeanUtils.copyProperties(healthcareCenterModel, healthcareCenterEntity);
        healthcareCenterRepository.save(healthcareCenterEntity);

        return healthcareCenterModel;
    }

    @Override
    public Boolean deleteHealthcareCenter(long id) {
        if(healthcareCenterRepository.existsById(id)){
            healthcareCenterRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}