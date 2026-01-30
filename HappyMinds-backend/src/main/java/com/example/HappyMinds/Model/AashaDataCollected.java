package com.example.HappyMinds.Model;

public class AashaDataCollected {

    private String client_name;
    private String client_address;
    private String client_region;
    private String q1_daily_routine;
    private int q1_answer;
    private String q2_social_connections;
    private int q2_answer;
    private String q3_home_environment;
    private int q3_answer;
    private String q4_future_outlook;
    private int q4_answer;
    private String q5_self_care;
    private int q5_answer;
    private String q6_stress_management;
    private String q6_answer;

    // Getters and Setters
    public String getclient_name() { return client_name; }
    public void setclient_name(String client_name) { this.client_name = client_name; }

    public String getclient_address() { return client_address; }
    public void setclient_address(String client_address) { this.client_address = client_address; }

    public String getclient_region() { return client_region; }
    public void setclient_region(String client_region) { this.client_region = client_region; }

    public String getq1_daily_routine() { return q1_daily_routine; }
    public void setq1_daily_routine(String q1_daily_routine) { this.q1_daily_routine = q1_daily_routine; }

    public int getq1_answer() { return q1_answer; }
    public void setq1_answer(int q1_answer) { this.q1_answer = q1_answer; }

    public String getq2_social_connections() { return q2_social_connections; }
    public void setq2_social_connections(String q2_social_connections) { this.q2_social_connections = q2_social_connections; }

    public int getq2_answer() { return q2_answer; }
    public void setq2_answer(int q2_answer) { this.q2_answer = q2_answer; }

    public String getq3_home_environment() { return q3_home_environment; }
    public void setq3_home_environment(String q3_home_environment) { this.q3_home_environment = q3_home_environment; }

    public int getq3_answer() { return q3_answer; }
    public void setq3_answer(int q3_answer) { this.q3_answer = q3_answer; }

    public String getq4_future_outlook() { return q4_future_outlook; }
    public void setq4_future_outlook(String q4_future_outlook) { this.q4_future_outlook = q4_future_outlook; }

    public int getq4_answer() { return q4_answer; }
    public void setq4_answer(int q4_answer) { this.q4_answer = q4_answer; }

    public String getq5_self_care() { return q5_self_care; }
    public void setq5_self_care(String q5_self_care) { this.q5_self_care = q5_self_care; }

    public int getq5_answer() { return q5_answer; }
    public void setq5_answer(int q5_answer) { this.q5_answer = q5_answer; }

    public String getq6_stress_management() { return q6_stress_management; }
    public void setq6_stress_management(String q6_stress_management) { this.q6_stress_management = q6_stress_management; }

    public String getq6_answer() { return q6_answer; }
    public void setq6_answer(String q6_answer) { this.q6_answer = q6_answer; }

    @Override
    public String toString() {
        return "AashaDataCollected{" +
                "client_name='" + client_name + '\'' +
                ", client_address='" + client_address + '\'' +
                ", client_region='" + client_region + '\'' +
                ", q1_daily_routine='" + q1_daily_routine + '\'' +
                ", q1_answer=" + q1_answer +
                ", q2_social_connections='" + q2_social_connections + '\'' +
                ", q2_answer=" + q2_answer +
                ", q3_home_environment='" + q3_home_environment + '\'' +
                ", q3_answer=" + q3_answer +
                ", q4_future_outlook='" + q4_future_outlook + '\'' +
                ", q4_answer=" + q4_answer +
                ", q5_self_care='" + q5_self_care + '\'' +
                ", q5_answer=" + q5_answer +
                ", q6_stress_management='" + q6_stress_management + '\'' +
                ", q6_answer='" + q6_answer + '\'' +
                '}';
    }


}


