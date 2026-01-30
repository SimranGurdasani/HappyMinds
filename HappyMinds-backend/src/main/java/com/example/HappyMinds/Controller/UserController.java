package com.example.HappyMinds.Controller;

import com.example.HappyMinds.Model.Bookings;
import com.example.HappyMinds.Model.UserModel;
import com.example.HappyMinds.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createUser")
    public void createUser(@RequestBody UserModel body){
        userService.createUser(body);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getAllMyBookings/{id}")
    public List<Map<String,Object>> getAllMyBookings(@PathVariable("id") int id){
        return userService.getAllMyBookings(id);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/getAllBookings")
    public List<Map<String,Object>> getAllBookings(){
        return userService.getAllBookings();
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping("/addBookings")
    public void addBookings(@RequestBody Bookings bookingsBody){
        System.out.println(bookingsBody);
        userService.addBookings(bookingsBody);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/getAllUsers")
    public List<Map<String,Object>> getAllUsers(){
        return userService.getAllUsers();
    }
}
