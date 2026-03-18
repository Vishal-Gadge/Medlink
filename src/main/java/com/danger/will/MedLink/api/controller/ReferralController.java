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

import com.danger.will.MedLink.api.model.ReferralModel;
import com.danger.will.MedLink.api.service.implementation.ReferralServiceImpl;
import com.danger.will.MedLink.api.service.services.ReferralService;

@RestController
@RequestMapping("/api/referral")
public class ReferralController {
    
    ReferralService referralService;

    ReferralController(ReferralServiceImpl referralServiceImpl){
        this.referralService = referralServiceImpl;
    }

    @PostMapping("/add")
    public ReferralModel addReferral(@RequestBody ReferralModel referralModel){
        return referralService.addReferral(referralModel);
    }

    @GetMapping("/{id}")
    public ReferralModel getReferralById(@PathVariable long id){
        return referralService.getReferralById(id);
    }

    @GetMapping("/all")
    public List<ReferralModel> getAllReferrals(){
        return referralService.getAllReferrals();
    }

    @PutMapping("/update/{id}/{msg}")
    public String updateReferralStatus(@PathVariable long id , @PathVariable String msg){
        return referralService.updateReferralStatus(id, msg);
    }

    @PutMapping("/update/{id}")
    public ReferralModel updateReferral(@PathVariable long id , @RequestBody ReferralModel referralModel){
        return referralService.updateReferral(id, referralModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteReferral(@PathVariable long id){
        if(referralService.deleteReferral(id)){
            return "Referral has been deleted of id: "+id;
        }else{
            return "Referral of id: "+id+" cannot be deleted or was not found.";
        }
    }
}
