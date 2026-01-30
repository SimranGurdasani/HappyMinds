package com.example.HappyMinds.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Map;

public class QuestionRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void submitQuestion(int id,Map<String,Object> body){
        jdbcTemplate.update("UPDATE TABLE users set question_response = ? where user_id = ?",body,id);
    }
}
