package com.example.HappyMinds.Service;

import com.example.HappyMinds.Model.SlotsModel;
import com.example.HappyMinds.Repository.BookASlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookASlotService {

    @Autowired
    BookASlotRepository bookASlotRepository;

    public List<Map<String,Object>> getAllTheripast()
    {
        return bookASlotRepository.getAllTherapists();
    }

    public List<Map<String,Object>> getAllAvailableDates(int id)
    {
        return bookASlotRepository.getAllAvailableDates( id);
    }

    public List<Map<String,Object>> getAllAvailableSlots(String date)
    {
        return  bookASlotRepository.getAllAvailableSlots(date);
    }

    public void createSlots( SlotsModel body){
        System.out.println(body);
        bookASlotRepository.createSlots(body);
    }
}
