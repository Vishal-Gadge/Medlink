package com.danger.will.MedLink.api.service.services;

import java.util.List;

import com.danger.will.MedLink.api.model.FacilityModel;

public interface FacilityService {
    
    FacilityModel addFacility(FacilityModel facilityModel);
    FacilityModel getFacilityById(long id);
    List<FacilityModel> getAllFacilities();
    FacilityModel updateFacility(long id , FacilityModel facilityModel);
    Boolean deleteFacility(long id);
    
}
