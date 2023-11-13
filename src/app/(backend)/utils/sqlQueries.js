export const sqlQueries = {
  user: {
    getAll: "SELECT * FROM users",
    getById: "SELECT * FROM users WHERE id=?",
    getByEmail: "SELECT * FROM users WHERE email = ?",
    postNew:
      "INSERT INTO users(fullname,email,password,userRole,gender,picture) VALUES(?,?,?,?,?,?)",
    updateRoleById: "UPDATE users SET userRole=? WHERE id=?",
    updatePasswordById: "UPDATE users SET password=? WHERE id=?",
    updatePhoneNumberById: "UPDATE users SET phone_number=? WHERE id=?",
    updateAddressById: "UPDATE users SET address=? WHERE id=?",
    updateProfilePictureById: "UPDATE users SET picture=? WHERE id=?",
    deleteByEmail: "DELETE FROM users WHERE email=?",
  },
  doctor: {
    getAll: "SELECT * FROM doctors",
    getById: "SELECT * FROM doctors WHERE doc_id=?",
    getByDepartment: "SELECT * FROM doctors WHERE routename=?",
    getByEmail: "SELECT * FROM doctors WHERE email=?",
    postNew:
      "INSERT INTO doctors(first_name, last_name, email, phone_number, speciality, gender, role, picture, routename,available_from, available_to) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    updatePhoneNumber: "UPDATE doctors SET phone_number=? WHERE doc_id=?",
    updateProfilePicture: "UPDATE doctors SET  picture=? WHERE doc_id=?",
    deleteByEmail: "DELETE FROM doctors WHERE email=?",
  },
  appointment: {
    getAll: "SELECT*FROM appointments",
    getById: "SELECT*FROM appointments WHERE appt_id=?",
    getByEmail: "SELECT*FROM appointments WHERE ref_email=?",
    getByEmailAndId:"SELECT*FROM appointments WHERE ref_email=? AND appt_id=?",
    getByDoctorsEmail:"SELECT * FROM appointments WHERE doc_email=?",
    postNew:
      "INSERT INTO appointments(patient_name, patient_age,patient_contact, patient_gender, patient_address, doc_id, ref_doctor, department, appt_type,appt_date,patient_issue,appt_fee,doc_email,appt_status,ref_email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    updateStatusPrescriptionTestPreferenceById:"UPDATE appointments SET appt_status=?, prescription=?, test_preferences=? WHERE appt_id=?"
  },
};
