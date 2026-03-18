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

import com.danger.will.MedLink.api.model.FacilityModel;
import com.danger.will.MedLink.api.service.implementation.FacilityServiceImpl;
import com.danger.will.MedLink.api.service.services.FacilityService;

@RestController
@RequestMapping("/api/facility")
public class FacilityController {
    
    FacilityService facilityService;

    FacilityController(FacilityServiceImpl facilityServiceImpl){
        this.facilityService = facilityServiceImpl;
    }

    @PostMapping("/add")
    public FacilityModel addFacility(@RequestBody FacilityModel facilityModel){
        return facilityService.addFacility(facilityModel);
    }

    @GetMapping("/{id}")
    public FacilityModel getFacilityById(@PathVariable long id){
        return facilityService.getFacilityById(id);
    }

    @GetMapping("/all")
    public List<FacilityModel> getAllFacilities(){
        return facilityService.getAllFacilities();
    }

    @PutMapping("/update/{id}")
    public FacilityModel updateFacility(@PathVariable long id , @RequestBody FacilityModel facilityModel){
        return facilityService.updateFacility(id, facilityModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFacility(@PathVariable long id){
        if(facilityService.deleteFacility(id)){
            return "Facility of id: "+id+" has been deleted";
        }else{
            return "Facility of id: "+id+" was not deleted or was not found";
        }
    }
}
