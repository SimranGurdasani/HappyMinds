package com.example.HappyMinds.Controller;


import com.example.HappyMinds.Model.AashaDataCollected;
import com.example.HappyMinds.Model.AashaHelper;
import com.example.HappyMinds.Model.TherapistsModel;
import com.example.HappyMinds.Service.TherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class TherapistController {

    @Autowired
    TherapistService therapistService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addTherapist")
    public void addTherapist(@RequestBody TherapistsModel body){
        therapistService.addTherapist(body);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/aasha_auth")
    public void aashaLogin(@RequestBody AashaHelper body){
        therapistService.aashaLogin(body);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getCollectedData/{a_id}")
    public List<Map<String,Object>> getCollectedData(@PathVariable("a_id") int a_id){
        return therapistService.getCollectedData(a_id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addData")
    public void addData(@RequestBody AashaDataCollected dataBody){
        System.out.println(dataBody);
        therapistService.addData(dataBody);
    }


}
