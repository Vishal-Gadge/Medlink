package com.danger.will.MedLink.api.service.services;

import java.util.List;

import com.danger.will.MedLink.api.model.HealthcareCenterModel;

public interface HealthcareCenterService {
    
    HealthcareCenterModel addHealthcareCenter(HealthcareCenterModel healthcareCenterModel);
    HealthcareCenterModel getHealthcareCenterById(long id);
    List<HealthcareCenterModel> getAllFacilities();
    HealthcareCenterModel updateHealthcareCenter(long id , HealthcareCenterModel healthcareCenterModel);
    Boolean deleteHealthcareCenter(long id);
    
}
