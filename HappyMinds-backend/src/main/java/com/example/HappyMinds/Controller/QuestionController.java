package com.example.HappyMinds.Controller;

import com.example.HappyMinds.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

public class QuestionController {
    @Autowired
    QuestionService questionService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/submitQuestion/{id}")
    public void submitQuestion(@PathVariable("id") int id, @RequestBody Map<String,Object> body){
        System.out.println(body);
        questionService.submitQuestion(id,body);
    }
}
