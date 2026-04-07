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
@Table(name="doctorEntity")
public class DoctorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String username;
    private String password;
    private String role;

    @ManyToOne                            //many doctors one healthcareCenter
    @JoinColumn(name = "healthcareCenter_id")     //tells ORM to create a colunm int doctorEntity table
    private HealthcareCenterEntity healthcareCenter;      //every doctor object has healthcareCenter object
}

// {
//         "name":"vishal",
//         "username":"DangerArmy",
//         "password":"12345",
//         "role":"heart surgeon",
//         "healthcareCenterId":2
//     }