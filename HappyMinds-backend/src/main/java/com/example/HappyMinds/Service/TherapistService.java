package com.example.HappyMinds.Service;


import com.example.HappyMinds.Model.AashaDataCollected;
import com.example.HappyMinds.Model.AashaHelper;
import com.example.HappyMinds.Model.TherapistsModel;
import com.example.HappyMinds.Repository.TherapistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
public class TherapistService {

    @Autowired
    TherapistRepository therapistRepository;

    public void addTherapist( TherapistsModel body){
        therapistRepository.addTherapist(body);
    }

    public void aashaLogin(AashaHelper helper){
        therapistRepository.aashaLogin(helper);
    }

    public List<Map<String,Object>> getCollectedData(int a_id){
        return therapistRepository.getCollectedData(a_id);
    }

    public void addData( AashaDataCollected dataBody){
        therapistRepository.addData(dataBody);
    }
}
