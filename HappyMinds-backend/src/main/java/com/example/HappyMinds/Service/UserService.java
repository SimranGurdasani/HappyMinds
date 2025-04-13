package com.example.HappyMinds.Service;

import com.example.HappyMinds.Model.Bookings;
import com.example.HappyMinds.Model.UserModel;
import com.example.HappyMinds.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void createUser(UserModel body){
        userRepository.createUser(body);
    }

    public List<Map<String,Object>> getAllMyBookings(int id){
       return userRepository.getAllMyBookings(id);
    }

    public List<Map<String,Object>> getAllBookings(){
        return userRepository.getAllBookings();
    }

    public void addBookings(@RequestBody Bookings bookingsBody){
        userRepository.addBookings(bookingsBody);
    }

    public List<Map<String,Object>> getAllUsers(){
        return userRepository.getAllUsers();
    }
}

