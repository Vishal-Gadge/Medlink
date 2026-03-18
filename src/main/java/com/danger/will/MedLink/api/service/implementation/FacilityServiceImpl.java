package com.danger.will.MedLink.api.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.danger.will.MedLink.api.entity.FacilityEntity;
import com.danger.will.MedLink.api.model.FacilityModel;
import com.danger.will.MedLink.api.repository.FacilityRepository;
import com.danger.will.MedLink.api.service.services.FacilityService;

@Service
public class FacilityServiceImpl implements FacilityService{

    FacilityRepository facilityRepository;
    FacilityEntity facilityEntity = new FacilityEntity();
    FacilityModel facilityModel = new FacilityModel();

    FacilityServiceImpl(FacilityRepository facilityRepository){
        this.facilityRepository = facilityRepository;
    }

    @Override
    public FacilityModel addFacility(FacilityModel facilityModel) {
        BeanUtils.copyProperties(facilityModel, facilityEntity);
        facilityRepository.save(facilityEntity);
        return facilityModel;
    }

    @Override
    public FacilityModel getFacilityById(long id) {
        facilityEntity = facilityRepository.findById(id)
                                           .orElseThrow(()->new RuntimeException("Record not found"));
        
        BeanUtils.copyProperties(facilityEntity, facilityModel);
        return facilityModel;
    }

    @Override
    public List<FacilityModel> getAllFacilities() {
        List<FacilityEntity> facilityEntities = facilityRepository.findAll();
        List<FacilityModel> facilityModels = new ArrayList<>();

        for(FacilityEntity facilityEntity : facilityEntities){
            FacilityModel tempFacilityModel = new FacilityModel();
            BeanUtils.copyProperties(facilityEntity, tempFacilityModel);
            facilityModels.add(tempFacilityModel);
        }

        return facilityModels;
    }

    @Override
    public FacilityModel updateFacility(long id, FacilityModel facilityModel) {
        facilityEntity = facilityRepository.findById(id)
                                           .orElseThrow(()->new RuntimeException("Record not found"));

        BeanUtils.copyProperties(facilityModel, facilityEntity);
        facilityRepository.save(facilityEntity);

        return facilityModel;
    }

    @Override
    public Boolean deleteFacility(long id) {
        if(facilityRepository.existsById(id)){
            facilityRepository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}