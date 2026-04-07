package com.danger.will.MedLink.api.model;

import lombok.Data;

@Data
public class DoctorModel {
    private long id;
    private String name;
    private String username;
    private String password;
    private String role;
    private Long healthcareCenterId;
}

// {
//     "id":"2005",
//     "name":"vishal",
//     "username":"dangerArmy",
//     "password":"12345",
//     "role":"doctor",
//     "healthcareCenterId":"001"
// }
