package com.example.HappyMinds.Model;

import java.time.LocalDateTime;

public class Bookings {

    public int therapistId;

    public int getTherapistId() {
        return therapistId;
    }

    public void setTherapistId(int therapistId) {
        this.therapistId = therapistId;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public boolean isActivityCompleted() {
        return activityCompleted;
    }

    public void setActivityCompleted(boolean activityCompleted) {
        this.activityCompleted = activityCompleted;
    }

    public int user_id;
    public String dateTime;
    public boolean activityCompleted;

    @Override
    public String toString() {
        return "Bookings{" +
                "therapistId=" + therapistId +
                ", user_id=" + user_id +
                ", dateTime='" + dateTime + '\'' +
                ", activityCompleted=" + activityCompleted +
                '}';
    }
}
