package com.danger.will.MedLink.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.danger.will.MedLink.api.entity.PatientEntity;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity,Long>{}