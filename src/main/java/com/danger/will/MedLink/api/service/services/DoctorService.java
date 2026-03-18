package com.danger.will.MedLink.api.service.services;

import java.util.List;

import com.danger.will.MedLink.api.model.DoctorModel;

public interface DoctorService {
    
    DoctorModel addDoctor(DoctorModel doctorModel);                 //post
    List<DoctorModel> getAllDoctors();                              //get
    DoctorModel getDoctorById(long id);                             //get
    DoctorModel updateDoctor(long id, DoctorModel doctorModel);     //put
    Boolean deleteDoctor(long id);                                  //delete
}
