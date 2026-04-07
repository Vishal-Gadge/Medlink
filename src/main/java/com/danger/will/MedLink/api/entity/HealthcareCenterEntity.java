package com.danger.will.MedLink.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="healthcareCenterEntity")
public class HealthcareCenterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String type;
    private String address;
}

// {
//     "id":4,
//     "name":"more hospital",
//     "type":"hospital",
//     "address":"lakhmapur"
// }
