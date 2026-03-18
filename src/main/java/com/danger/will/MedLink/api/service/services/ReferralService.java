package com.danger.will.MedLink.api.service.services;

import java.util.List;

import com.danger.will.MedLink.api.model.ReferralModel;

public interface ReferralService {
    
    ReferralModel addReferral(ReferralModel referralModel);
    ReferralModel getReferralById(long id);
    List<ReferralModel> getAllReferrals();
    String updateReferralStatus(long id , String status);
    ReferralModel updateReferral(long id , ReferralModel referralModel);
    Boolean deleteReferral(long id);
    
}
