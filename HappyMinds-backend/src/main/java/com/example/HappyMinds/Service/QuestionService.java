package com.example.HappyMinds.Service;

import com.example.HappyMinds.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    public void submitQuestion(int id,Map<String,Object> body){
        System.out.println(body);
        questionRepository.submitQuestion(id,body);
    }


}
