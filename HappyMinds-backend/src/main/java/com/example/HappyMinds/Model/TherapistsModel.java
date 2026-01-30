package com.example.HappyMinds.Model;

public class TherapistsModel {
    private String therapistName;
    private String city;
    private String speciality;
    private String gender;
    private int years_experience;
    private String qualifications;
    private String workplace;
    private String email;
    private String password;

    public String getTherapistName() {
        return therapistName;
    }

    public void setTherapistName(String therapistName) {
        this.therapistName = therapistName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getYears_experience() {
        return years_experience;
    }

    public void setYears_experience(int years_experience) {
        this.years_experience = years_experience;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public String getWorkplace() {
        return workplace;
    }

    public void setWorkplace(String workplace) {
        this.workplace = workplace;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "TherapistsModel{" +
                ", therapistName='" + therapistName + '\'' +
                ", city='" + city + '\'' +
                ", speciality='" + speciality + '\'' +
                ", gender='" + gender + '\'' +
                ", years_experience=" + years_experience +
                ", qualifications='" + qualifications + '\'' +
                ", workplace='" + workplace + '\'' +
                ", email='" + email + '\'' +
                ", password='[PROTECTED]'" + // Masked password for security
                '}';
    }
}