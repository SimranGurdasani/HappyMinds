package com.example.HappyMinds.Repository;

import com.example.HappyMinds.Model.AashaDataCollected;
import com.example.HappyMinds.Model.AashaHelper;
import com.example.HappyMinds.Model.TherapistsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class TherapistRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addTherapist(TherapistsModel body) {
        String sql = "INSERT INTO Therapists (" +
                "therapistName, city, speciality, gender, years_experience, " +
                "qualifications, workplace, email, password) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(sql,
                body.getTherapistName(),
                body.getCity(),
                body.getSpeciality(),
                body.getGender(),
                body.getYears_experience(),  // Ensure correct data type (INTEGER)
                body.getQualifications(),
                body.getWorkplace(),
                body.getEmail(),
                body.getPassword()  // Ensure encryption if storing passwords
        );
    }

    public void aashaLogin(AashaHelper helper){
        jdbcTemplate.queryForList("Select * from Aasha_helper where a_id = ? AND password = ? ", helper.getA_id(), helper.getPassword());
    }


    public List<Map<String,Object>> getCollectedData(int a_id){
        return jdbcTemplate.queryForList("SELECT \n" +
                "    Aasha_Helper.a_id, \n" +
                "    Aasha_Helper.d_id, \n" +
                "    DataCollected.*\n" +
                "FROM \n" +
                "    Aasha_Helper\n" +
                "INNER JOIN \n" +
                "    DataCollected \n" +
                "ON \n" +
                "    Aasha_Helper.d_id = DataCollected.d_id\n" +
                "WHERE \n" +
                "    Aasha_Helper.a_id = ?;\n",a_id);
    }

    public void addData(AashaDataCollected dataBody) {
        String sql = "INSERT INTO DataCollected (client_name, client_address, client_region, q1_daily_routine, q1_answer, q2_social_connections, q2_answer, q3_home_environment, q3_answer, q4_future_outlook, q4_answer, q5_self_care, q5_answer, q6_stress_management, q6_answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                dataBody.getclient_name(),
                dataBody.getclient_address(),
                dataBody.getclient_region(),
                dataBody.getq1_daily_routine(),
                dataBody.getq1_answer(),
                dataBody.getq2_social_connections(),
                dataBody.getq2_answer(),
                dataBody.getq3_home_environment(),
                dataBody.getq3_answer(),
                dataBody.getq4_future_outlook(),
                dataBody.getq4_answer(),
                dataBody.getq5_self_care(),
                dataBody.getq5_answer(),
                dataBody.getq6_stress_management(),
                dataBody.getq6_answer()
        );
    }
}
