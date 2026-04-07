package com.danger.will.MedLink.api.model;

import lombok.Data;

@Data
public class ReferralModel {
    private long id;
    private long patientId;         
    private long healthcareCenterId;     
    private long referringDoctorId;
    private long receivingDoctorId;         
    private String diagnosis;
    private String status;
}
