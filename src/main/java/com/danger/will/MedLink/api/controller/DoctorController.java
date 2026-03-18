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

import com.danger.will.MedLink.api.model.DoctorModel;
import com.danger.will.MedLink.api.service.implementation.DoctorServiceImpl;
import com.danger.will.MedLink.api.service.services.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
    
    DoctorService doctorService;

    DoctorController(DoctorServiceImpl doctorServiceImpl){
        this.doctorService = doctorServiceImpl;
    }

    @GetMapping
    public String welcome(){
        return "Welcome to doctor controller";
    }

    @GetMapping("/{id}")
    public DoctorModel getDoctorById(@PathVariable long id){
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/all")
    public List<DoctorModel> getAllDoctors(){
        return doctorService.getAllDoctors();
    }

    @PostMapping("/add")
    public String addDoctor(@RequestBody DoctorModel doctorModel){
        return doctorService.addDoctor(doctorModel).getName()+" record has been added ";
    }

    @PutMapping("/update/{id}")
    public DoctorModel updateDoctor(@PathVariable long id , @RequestBody DoctorModel doctorModel){
        return doctorService.updateDoctor(id, doctorModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDoctor(@PathVariable long id){
        if (doctorService.deleteDoctor(id)) {
            return "Doctor record of id: "+id+" has been deleted";            
        }else
            return "Doctor for id: "+id+" not deleted or was not found";
    }
}
