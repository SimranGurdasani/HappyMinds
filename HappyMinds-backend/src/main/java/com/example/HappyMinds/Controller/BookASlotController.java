package com.example.HappyMinds.Controller;

import com.example.HappyMinds.Model.SlotsModel;
import com.example.HappyMinds.Service.BookASlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class BookASlotController {

    @Autowired
    BookASlotService bookASlotService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getAllTheripast")
    public List<Map<String,Object>> getAllTheripast(){
        return bookASlotService.getAllTheripast();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getAllAvailableDates/{id}")
    public List<Map<String,Object>> getAllAvailableDates(@PathVariable("id") int id){
        return bookASlotService.getAllAvailableDates(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getAllAvailableSlots/{date}")
    public List<Map<String,Object>>  getAllAvailableSlots(@PathVariable("date") String date){
        return bookASlotService.getAllAvailableSlots(date);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createSlots")
    public void createSlots(@RequestBody SlotsModel body){
        System.out.println(body);
        bookASlotService.createSlots(body);
    }


}
