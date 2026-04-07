package com.danger.will.MedLink.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.danger.will.MedLink.api.entity.HealthcareCenterEntity;

@Repository
public interface HealthcareCenterRepository extends JpaRepository<HealthcareCenterEntity,Long>{}
