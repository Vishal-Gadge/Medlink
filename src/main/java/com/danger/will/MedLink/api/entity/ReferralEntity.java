package com.danger.will.MedLink.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="referralEntity")
public class ReferralEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "patientId")
    private PatientEntity patient;          //foreign key

    @ManyToOne
    @JoinColumn(name = "facilityId")
    private FacilityEntity facility;     //where the patient coming from

    @ManyToOne
    @JoinColumn(name = "referringDoctorId")
    private DoctorEntity referringDoctor;  //doctor who referred

    @ManyToOne
    @JoinColumn(name = "receivingDoctorId")
    private DoctorEntity receivingDoctor;         //doctor assigned to it

    private String diagnosis;
    private String status;
}

// {
//         "patientId":1,
//         "facilityId":3,
//         "referringDoctorId":1,
//         "receivingDoctorId":2,
//         "diagnosis":"going to die soon",
//         "status":"checked"
//     }
