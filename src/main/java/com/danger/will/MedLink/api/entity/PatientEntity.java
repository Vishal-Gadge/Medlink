package com.danger.will.MedLink.api.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="patientEntity")
public class PatientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(nullable=false)
    private String username;

    private LocalDate dateOfBirth;

    private String gender;
    private String contactNumber;

    // {
    //     "username":"pritam",
    //     "dateOfBirth":"2026-03-17",
    //     "gender":"male",
    //     "contactNumber":"928992397"
    // }
}
