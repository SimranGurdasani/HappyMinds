package com.example.HappyMinds.Model;

public class AashaHelper {

    public int getA_id() {
        return a_id;
    }

    public void setA_id(int a_id) {
        this.a_id = a_id;
    }

    private int a_id;


    public String getA_name() {
        return a_name;
    }

    public void setA_name(String a_name) {
        this.a_name = a_name;
    }

    public int getD_id() {
        return d_id;
    }

    public void setD_id(int d_id) {
        this.d_id = d_id;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String a_name;
    public int d_id;
    public int points;
    public String password;

    @Override
    public String toString() {
        return "AashaHelper{" +
                "a_id = "+ a_id + '\''+
                "a_name='" + a_name + '\'' +
                ", d_id=" + d_id +
                ", points=" + points +
                ", password='" + password + '\'' +
                '}';
    }
}
