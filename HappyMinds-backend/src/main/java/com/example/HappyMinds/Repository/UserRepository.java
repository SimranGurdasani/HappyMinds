package com.example.HappyMinds.Repository;

import com.example.HappyMinds.Model.Bookings;
import com.example.HappyMinds.Model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Repository
public class UserRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void createUser(UserModel body) {
        String sql = "INSERT INTO [users] (username, email, phone_number, [password]) VALUES (?, ?, ?, ?)";

        jdbcTemplate.update(sql,
                body.getUsername(),
                body.getEmail(),
                body.getPhone_number(),
                body.getPassword()  // Ensure password hashing for security
        );
    }


    public List<Map<String, Object>> getAllMyBookings(int id){
       return jdbcTemplate.queryForList("SELECT * FROM BOOKINGS WHERE BOOKINGS.user_id = ?",id);
    }

    public List<Map<String,Object>> getAllBookings(){
        return jdbcTemplate.queryForList("Select * from BOOKINGS");
    }

    public void addBookings(@RequestBody Bookings bookingsBody){
        System.out.println(bookingsBody);
        jdbcTemplate.update("Insert Into Bookings  (therapistId, user_id, dateTime, activityCompleted) VALUES (?, ?, ?, ?)",bookingsBody.getTherapistId(),bookingsBody.getUser_id(),bookingsBody.getDateTime(),bookingsBody.isActivityCompleted());
//        jdbcTemplate.update("Insert Into ");
    }
    public List<Map<String,Object>> getAllUsers(){
        return jdbcTemplate.queryForList("SELECT * FROM USERS");
    }
}
