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

import com.danger.will.MedLink.api.model.HealthcareCenterModel;
import com.danger.will.MedLink.api.service.implementation.HealthcareCenterServiceImpl;
import com.danger.will.MedLink.api.service.services.HealthcareCenterService;

@RestController
@RequestMapping("/api/healthcareCenter")
public class HealthcareCenterController {
    
    HealthcareCenterService healthcareCenterService;

    HealthcareCenterController(HealthcareCenterServiceImpl healthcareCenterServiceImpl){
        this.healthcareCenterService = healthcareCenterServiceImpl;
    }

    @PostMapping("/add")
    public HealthcareCenterModel addHealthcareCenter(@RequestBody HealthcareCenterModel healthcareCenterModel){
        return healthcareCenterService.addHealthcareCenter(healthcareCenterModel);
    }

    @GetMapping("/{id}")
    public HealthcareCenterModel getHealthcareCenterById(@PathVariable long id){
        return healthcareCenterService.getHealthcareCenterById(id);
    }

    @GetMapping("/all")
    public List<HealthcareCenterModel> getAllFacilities(){
        return healthcareCenterService.getAllFacilities();
    }

    @PutMapping("/update/{id}")
    public HealthcareCenterModel updateHealthcareCenter(@PathVariable long id , @RequestBody HealthcareCenterModel healthcareCenterModel){
        return healthcareCenterService.updateHealthcareCenter(id, healthcareCenterModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteHealthcareCenter(@PathVariable long id){
        if(healthcareCenterService.deleteHealthcareCenter(id)){
            return "HealthcareCenter of id: "+id+" has been deleted";
        }else{
            return "HealthcareCenter of id: "+id+" was not deleted or was not found";
        }
    }
}
