package com.example.HappyMinds.Repository;

import com.example.HappyMinds.Model.SlotsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BookASlotRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String,Object>> getAllTherapists(){
        return jdbcTemplate.queryForList("SELECT * FROM Therapists");
    }

    public List<Map<String,Object>> getAllAvailableDates(int id){
        return jdbcTemplate.queryForList("SELECT [Date] FROM Slots WHERE therapistId = ?", id);
    }

    public List<Map<String,Object>> getAllAvailableSlots(String date){
        return jdbcTemplate.queryForList("SELECT timeSlot FROM Slots WHERE [Date] = ?", date);
    }

    public void createSlots(SlotsModel slotsModel){
        jdbcTemplate.update("INSERT INTO Slots(therapistId, [Date], timeSlot) VALUES (?, ?, ?)",
                slotsModel.getTherapistId(), slotsModel.getDate(), slotsModel.getTimeSlot());
    }

}
